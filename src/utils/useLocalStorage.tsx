import { useState } from "react";

export function useLocalStorage(key, initialValue = '') {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        console.log('hui item key', key, item);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.warn("hui Error reading from localStorage", error);
        return initialValue;
      }
    });
  
    const setValue = (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        console.log('hui key value', key, value);
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error("hui Error saving to localStorage", error);
      }
    };
  
    return [storedValue, setValue];
  }
  