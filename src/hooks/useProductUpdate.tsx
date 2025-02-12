import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { debounce } from '../utils/debounce';
import { fetchToken } from '../utils/fetchToken';
import { fetchData } from '../utils/fetchData';
import { IndividualInfo } from '@/utils/insuranceTypes';

const initialState = {
	ltd: null,
	std: null,
	life: null,
	critical: null,
	vision: null,
	dental: null,
	accident: null
};

export function useProductUpdate(individualInfo: IndividualInfo) {
  const [isLoading, setLoading] = useState(false);
  const [productCalculations, setProuctCalculations] = useState(initialState);

  const [token, setToken] = useLocalStorage('token');

  useEffect(() => {
		if (individualInfo.age === 0) {
			return; // should return the default values
		}
		// else

    setLoading(true);
    const query = new URLSearchParams({
        age: individualInfo.age.toString()
    });
    fetchData(query, token)
        .then(data => {
            setProuctCalculations(prev => ({
							...prev,
							ltd: { ...data },
						}));
        })
				.catch((err) => {
					console.log('fucking error', err);
				});
  }, [individualInfo.age]);

  useEffect(() => {
    setLoading(false);
  }, [productCalculations]);

  // Debounced version of fetchData (500ms debounce)
  // const debouncedFetchData = useCallback(
  //   debounce((query) => {
  //     fetchData(query, token);
  //   }, 500),
  //   [token]
  // );

  // On mount, check for token in local storage; if missing, fetch one
  useEffect(() => {
    if (!token) {
      fetchToken();
    }
  }, []);

  return [productCalculations, isLoading];
}