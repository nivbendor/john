import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchWithToken, getToken, fetchToken } from '../services/authService';
import { debounce } from '../utils/debounce';
import { IndividualInfo } from '../utils/insuranceTypes';
import { URI_SETTINGS } from '../utils/config';

const DEBOUNCE_DELAY = 1000;

const productConfig = {
  ltd: {
    triggers: { salary: true },
    buildUrl: ({ salary }) => `/ltd/?salary=${salary}`
  },
  std: {
    triggers: { salary: true, age: true },
    buildUrl: ({ salary, age }) => `/std/?salary=${salary}&age=${age}`
  },
  life: {
    triggers: { age: true, employeeCoverage: true, spouseCoverage: true },
    buildUrl: ({ age, employeeCoverage, spouseCoverage }) => 
      `/life/?age=${age}&employeeCoverage=${employeeCoverage}&spouseCoverage=${spouseCoverage}`
  },
  accident: { // accident should be invoked only once, since the rest of the data is static
    triggers: { salary: true, age: true, zipCode: true, employeeCoverage: true, spouseCoverage: true },
    buildUrl: () => `/accident`
  },
  dental: {
    triggers: { zipCode: true },
    buildUrl: ({ zipCode }) => `/dental/?zipCode=${zipCode}`
  },
  vision: {
    triggers: { zipCode: true },
    buildUrl: ({ zipCode }) => `/vision/?zipCode=${zipCode}`
  },
  critical: {
    triggers: { age: true },
    buildUrl: ({ age }) => `/critical/?age=${age}`
  },
};

/**
 * 
 * @param {object} userData 
 * Example: { age: number, salary: number, zipCode: string }
 */
export function useQuotes(individualInfo: IndividualInfo) {

  // We'll store results for each product in an object:
  const [quotes, setQuotes] = useState({
    ltd: null,
    std: null,
    life: null,
    accident: null,
    dental: null,
    vision: null,
    critical: null,
  });

  // Track loading state—optional if you want partial loading per product
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // We'll store old values of age, salary, zipCode
  const prevAgeRef = useRef(individualInfo.age);
  const prevSalaryRef = useRef(individualInfo.annualSalary);
  const prevZipRef = useRef(individualInfo.zipCode);
  const prevEmployeeCoverageRef = useRef(individualInfo.employeeCoverage);
  const prevSpouseCoverageRef = useRef(individualInfo.spouseCoverage);

  // On mount, ensure we have a token
  useEffect(() => {
    if (!getToken()) {
      fetchToken().catch(err => {
        console.error('Error fetching initial token:', err);
      });
    }
  }, []);

  // The main function to fetch quotes for a set of products
  const fetchProducts = useCallback(async (productsToFetch, { age, salary, zipCode, employeeCoverage, spouseCoverage }) => {
    setLoading(true);
    setError(null);
    try {
      // We’ll do all requests in parallel
      const requests = productsToFetch.map(async (product) => {
        const { buildUrl } = productConfig[product];
        const pathname = buildUrl({ age, salary, zipCode, employeeCoverage, spouseCoverage });
        const url = URI_SETTINGS.quote() + pathname;
        const response = await fetchWithToken(url);
        if (response.status === 200 || response.status === 201) {
          return { product, data: response.data };
        } else {
          // If the API is consistent with 201 on success, handle or log other statuses
          console.warn(`Unexpected status for ${product}:`, response.status);
          return { product, data: null };
        }
      });

      const results = await Promise.all(requests);

      setQuotes(prev => {
        const updated = { ...prev };
        for (const { product, data } of results) {
          updated[product] = data;
        }
        return updated;
      });
    } catch (err) {
      console.error('Error fetching product quotes:', err);
      if (err instanceof Error) {
        setError(err.message || 'Unknown error');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced version of fetchProducts
  const debouncedFetchProducts = useCallback(
    debounce((productsToFetch, values) => {
      return fetchProducts(productsToFetch, values);
    }, DEBOUNCE_DELAY),
    [fetchProducts]
  );

  // The effect that checks what changed
  useEffect(() => {
    const changedAge = individualInfo.age !== prevAgeRef.current;
    const changedSalary = individualInfo.annualSalary !== prevSalaryRef.current;
    const changedZip = individualInfo.zipCode !== prevZipRef.current;
    const changedEmployeeCoverage = individualInfo.employeeCoverage !== prevEmployeeCoverageRef.current;
    const changedSpouseCoverage = individualInfo.spouseCoverage !== prevSpouseCoverageRef.current;

    const productsToFetch = [] as string[];

    // For each product, check if any triggers changed
    for (const product of Object.keys(productConfig)) {
      const triggers = productConfig[product].triggers;
      // If triggers.age is true and changedAge is true -> fetch
      // If triggers.salary is true and changedSalary is true -> fetch
      // If triggers.zipCode is true and changedZip is true -> fetch
      // and etc...

      let needsFetch = false;
      if (triggers.age && changedAge) needsFetch = true;
      if (triggers.salary && changedSalary) needsFetch = true;
      if (triggers.zipCode && changedZip) needsFetch = true;
      if (triggers.employeeCoverage && changedEmployeeCoverage) needsFetch = true;
      if (triggers.spouseCoverage && changedSpouseCoverage) needsFetch = true;

      if (needsFetch) {
        // Skip 'accident' if we've already fetched it
        if (product === 'accident' && quotes.accident !== null) {
          // Do nothing
          // accident should be fetched only once, because it doesn't have any dependencies
        }
        // Skip 'std' if there's no salary info
        else if (product === 'std' && individualInfo.annualSalary <= 0) { 
          // Do nothing
        } 
        else {
          productsToFetch.push(product);
        }
      }
    }

    if (productsToFetch.length > 0) {
      debouncedFetchProducts(productsToFetch, {
        age: individualInfo.age, 
        salary: individualInfo.annualSalary, 
        zipCode: individualInfo.zipCode,
        employeeCoverage: individualInfo.employeeCoverage,
        spouseCoverage: individualInfo.spouseCoverage,
      });
    }

    prevAgeRef.current = individualInfo.age;
    prevSalaryRef.current = individualInfo.annualSalary;
    prevZipRef.current = individualInfo.zipCode;
    prevEmployeeCoverageRef.current = individualInfo.employeeCoverage;
    prevSpouseCoverageRef.current = individualInfo.spouseCoverage;

    // Cleanup to avoid memory leaks
    return () => {
      // debouncedFetchProducts.cancel();
    };
  }, [individualInfo.age, individualInfo.annualSalary, individualInfo.zipCode, individualInfo.employeeCoverage, individualInfo.spouseCoverage, debouncedFetchProducts]);

  return {
    quotes,
    loading,
    error
  };
}
