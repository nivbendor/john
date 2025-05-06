import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchWithToken, fetchToken, isTokenValid } from '../services/authService';
import { debounce } from '../utils/debounce';
import { IndividualInfo, Quotes } from '../utils/insuranceTypes';
import { BABRM, TAA, URI_SETTINGS } from '../utils/config';
import { isServerCalculations } from '../utils/isServerCalculations';
import { isDistributor } from '../utils/isDistributor';
import { ParsedUrlParams } from '../utils/parseUrlParams';

const DEBOUNCE_DELAY = 1000;

const productConfig = {
  ltd: {
    triggers: { annualSalary: true },
    buildUrl: ({ annualSalary }) => `/ltd/?salary=${annualSalary}`
  },
  std: {
    triggers: { annualSalary: true, age: true },
    buildUrl: ({ annualSalary, age }) => `/std/?salary=${annualSalary}&age=${age}`
  },
  life: {
    triggers: { age: true, employeeCoverage: true, spouseCoverage: true },
    buildUrl: ({ age, employeeCoverage, spouseCoverage }) => 
      `/life/?age=${age}&employeeCoverage=${employeeCoverage}&spouseCoverage=${spouseCoverage}`
  },
  accident: { // accident should be invoked only once, since the rest of the data is static
    triggers: { age: true, employeeCoverage: true, spouseCoverage: true },
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
  hospital: { // hospital indemnity should be invoked only once, since the rest of the data is static
    triggers: { age: true, employeeCoverage: true, spouseCoverage: true },
    buildUrl: () => `/hospital`
  },
  tele: { // telehealth should be invoked only once, since the rest of the data is static
    triggers: { age: true, employeeCoverage: true, spouseCoverage: true },
    buildUrl: () => `/telehealth`
  },
  identity: { // identity theft protection should be invoked only once, since the rest of the data is static
    triggers: { age: true, employeeCoverage: true, spouseCoverage: true },
    buildUrl: () => `/identity`
  },
};

function isProductEnabled(product: keyof typeof productConfig) {
  // TODO: critical is hidden temporarily
  if (['hospital', 'critical'].includes(product) && isDistributor(TAA)) {
    return false;
  }

  if (['tele', 'identity'].includes(product) && isDistributor(BABRM)) {
    return false;
  }

  return true;
}

function isStaticData(quotes: Quotes, product: keyof typeof productConfig) {
  return (
    (product === 'accident' && quotes.accident !== null) || 
    (product === 'hospital' && quotes.hospital !== null) ||
    (product === 'identity' && quotes.identity !== null) ||
    (product === 'tele' && quotes.tele !== null)
  );
}

function enhanceUrl(url: string) {
  const distributorParam = isDistributor(BABRM)
    ? 'a=babrm'
    : isDistributor(TAA)
    ? 'a=taa'
    : '';

  if (!distributorParam) {
    return '';
  }

  const separator = url.includes('?') ? '&' : '?';
  return `${separator}${distributorParam}`;
}

/**
 * 
 */
export function useQuotes(individualInfo: IndividualInfo, urlParams: ParsedUrlParams, inputError: string) {

  // We'll store results for each product in an object:
  const [quotes, setQuotes] = useState<Quotes>({
    ltd: null,
    std: null,
    life: null,
    accident: null,
    dental: null,
    vision: null,
    critical: null,
    hospital: null,
    tele: null,
    identity: null,
  });

  // Track loading state—optional if you want partial loading per product
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenReady, setTokenReady] = useState(false);

  // We'll store old values of age, salary, zipCode
  const prevAgeRef = useRef(individualInfo.age);
  const prevSalaryRef = useRef(individualInfo.annualSalary);
  const prevZipRef = useRef(individualInfo.zipCode);
  const prevEmployeeCoverageRef = useRef(individualInfo.employeeCoverage);
  const prevSpouseCoverageRef = useRef(individualInfo.spouseCoverage);

  const init = useCallback(() => {

    const productsToFetch = [] as string[];
  
    // For each product, check if any triggers changed
    for (const product of Object.keys(productConfig)) {
      const triggers = productConfig[product].triggers;
  
      let needsFetch = false;
      if (triggers && triggers.age && urlParams.age && urlParams.age > 0) needsFetch = true;
      if (triggers && triggers.annualSalary && urlParams.annualSalary && urlParams.annualSalary > 0) needsFetch = true;
      if (triggers && triggers.zipCode && urlParams.zipCode) needsFetch = true;

      // if (triggers === null && (urlParams.age || urlParams.annualSalary || urlParams.zipCode)) {
      //   needsFetch = true;
      // }

      if (!isProductEnabled(product as keyof typeof productConfig)) {
        continue;
      }
  
      if (!needsFetch) {
        continue;
      }
  
      productsToFetch.push(product);
    }
  
    if (productsToFetch.length <= 0) { 
      return;
    }

    return fetchProducts(productsToFetch, {
      age: individualInfo.age,
      annualSalary: individualInfo.annualSalary,
      zipCode: individualInfo.zipCode,
      employeeCoverage: individualInfo.employeeCoverage,
      spouseCoverage: individualInfo.spouseCoverage,
    });
  }, []);

  // Effect 1: Ensure token is valid
  useEffect(() => {
    if (!isServerCalculations()) return;

    async function ensureToken() {
      if (!isTokenValid()) {
        await fetchToken();
      }
      setTokenReady(true);
    }

    ensureToken();
  }, []);

  // Effect 2: Run quote fetching only when token is ready
  useEffect(() => {
    if (!isServerCalculations() || !tokenReady) return;

    init();
  }, [tokenReady]);

  // The main function to fetch quotes for a set of products
  const fetchProducts = useCallback(async (productsToFetch, individualInfo: Partial<IndividualInfo>) => {
    if (inputError) {
      return;
    }
    // else
    setLoading(true);
    setError(null);
    try {
      // We’ll do all requests in parallel
      const requests = productsToFetch.map(async (product) => {
        const { buildUrl } = productConfig[product];
        const pathname = buildUrl(individualInfo);
        let url = URI_SETTINGS.quote() + pathname;
        
        url += enhanceUrl(url);

        let response;
        try {
          response = await fetchWithToken(url);
          return { product, data: response.data };
        } catch {
          console.warn(`Unexpected status for ${product}:`, response?.status);
          return { product, data: null };
        }
      });

      const results = await Promise.allSettled(requests);

      setQuotes(prev => {
        const updated = { ...prev };
        for (const productResult of results) {
          if (productResult.status === 'rejected') {
            updated[productResult.reason.product] = productResult.reason.data;
          } else {
            updated[productResult.value.product] = productResult.value.data;
          }
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
  }, [inputError]);

  // Debounced version of fetchProducts
  const debouncedFetchProducts = useCallback(
    debounce((productsToFetch, values) => {
      return fetchProducts(productsToFetch, values);
    }, DEBOUNCE_DELAY),
    [fetchProducts]
  );

  // The effect that checks what changed
  useEffect(() => {
    if (!isServerCalculations() || !tokenReady) {
      return;
    }

    const changedAge = individualInfo.age !== prevAgeRef.current;
    const changedSalary = individualInfo.annualSalary !== prevSalaryRef.current;
    const changedZip = individualInfo.zipCode.slice(0,3) !== prevZipRef.current.slice(0,3);
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
      if (triggers && triggers.age && changedAge) needsFetch = true;
      if (triggers && triggers.annualSalary && changedSalary) needsFetch = true;
      if (triggers && triggers.zipCode && changedZip) needsFetch = true;
      if (triggers && triggers.employeeCoverage && changedEmployeeCoverage) needsFetch = true;
      if (triggers && triggers.spouseCoverage && changedSpouseCoverage) needsFetch = true;

      if (needsFetch) {
        // Skip 'accident' if we've already fetched it
        if (isStaticData(quotes, product as keyof typeof productConfig)) {
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
        annualSalary: individualInfo.annualSalary,
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
  }, [individualInfo.age, individualInfo.annualSalary, individualInfo.zipCode, 
    individualInfo.employeeCoverage, individualInfo.spouseCoverage, tokenReady,
  ]);

  return {
    quotes,
    loading,
    error
  };
}
