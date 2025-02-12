import { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import { fetchWithToken, getToken, fetchToken } from '../services/authService';
import { IndividualInfo } from '@/utils/insuranceTypes';

const DEBOUNCE_DELAY = 500;

const productConfig = {
  ltd: {
    triggers: { salary: true },
    buildUrl: ({ salary }) => `/quote/ltd/?salary=${salary}`
  },
  std: {
    triggers: { salary: true, age: true },
    buildUrl: ({ salary, age }) => `/quote/std/?salary=${salary}&age=${age}`
  },
  critical: {
    triggers: { age: true },
    buildUrl: ({ age }) => `/quote/critical/?age=${age}`
  },
  vision: {
    triggers: { zipCode: true },
    buildUrl: ({ zipCode }) => `/quote/vision/?zip=${zipCode}`
  },
  dental: {
    triggers: { zipCode: true },
    buildUrl: ({ zipCode }) => `/quote/dental/?zip=${zipCode}`
  }
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
    critical: null,
    vision: null,
    dental: null
  });

  // Track loading state—optional if you want partial loading per product
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // We'll store old values of age, salary, zipCode
  const prevAgeRef = useRef(individualInfo.age);
  const prevSalaryRef = useRef(individualInfo.annualSalary);
  const prevZipRef = useRef(individualInfo.zipCode);

  // On mount, ensure we have a token
  useEffect(() => {
    if (!getToken()) {
      fetchToken().catch(err => {
        console.error('Error fetching initial token:', err);
      });
    }
  }, []);

  // The main function to fetch quotes for a set of products
  const fetchProducts = useCallback(async (productsToFetch, { age, salary, zipCode }) => {
    setLoading(true);
    setError(null);
    try {
      // We’ll do all requests in parallel
      const requests = productsToFetch.map(async (product) => {
        const { buildUrl } = productConfig[product];
        const url = buildUrl({ age, salary, zipCode });
        const response = await fetchWithToken(url);
        if (response.status === 201) {
          return { product, data: response.data };
        } else {
          // If the API is consistent with 201 on success, handle or log other statuses
          console.warn(`Unexpected status for ${product}:`, response.status);
          return { product, data: null };
        }
      });

      const results = await Promise.all(requests);
      // Merge results into 'quotes' state
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
      fetchProducts(productsToFetch, values);
    }, DEBOUNCE_DELAY),
    [fetchProducts]
  );

  // The effect that checks what changed
  useEffect(() => {
    const changedAge = age !== prevAgeRef.current;
    const changedSalary = salary !== prevSalaryRef.current;
    const changedZip = zipCode !== prevZipRef.current;

    // Collect which products we need to fetch
    const productsToFetch = [];

    // For each product, check if any triggers changed
    for (const product of Object.keys(productConfig)) {
      const triggers = productConfig[product].triggers; // e.g. { age: true, salary: true, ...}
      // If triggers.age is true and changedAge is true -> fetch
      // If triggers.salary is true and changedSalary is true -> fetch
      // If triggers.zipCode is true and changedZip is true -> fetch
      // If multiple triggers are required, we do an OR approach if any changed. 
      // (If you needed an AND approach, you'd do something else.)

      let needsFetch = false;
      if (triggers.age && changedAge) needsFetch = true;
      if (triggers.salary && changedSalary) needsFetch = true;
      if (triggers.zipCode && changedZip) needsFetch = true;

      if (needsFetch) {
        productsToFetch.push(product);
      }
    }

    if (productsToFetch.length > 0) {
      debouncedFetchProducts(productsToFetch, { age, salary, zipCode });
    }

    // Update refs
    prevAgeRef.current = age;
    prevSalaryRef.current = salary;
    prevZipRef.current = zipCode;

    // Cleanup to avoid memory leaks
    return () => {
      debouncedFetchProducts.cancel();
    };
  }, [age, salary, zipCode, debouncedFetchProducts]);

  return {
    quotes,   // { ltd, std, critical, vision, dental }
    loading,
    error
  };
}
