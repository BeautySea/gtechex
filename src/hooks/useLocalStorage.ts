import { useState, useCallback, Dispatch, SetStateAction } from 'react';

type StoredValue<T> = [string | T | undefined, Dispatch<SetStateAction<T | undefined>>];

function useLocalStorage<T>(key: string, initialValue?: T): StoredValue<T> {
  const storedValue = (): T | undefined => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (item as T) : initialValue;
    } catch (error) {
      console.error(`Error retrieving value from localStorage for key "${key}":`, error);
      return initialValue;
    }
  };
  
  

  const [value, setValue] = useState<T | undefined>(storedValue);

  const setStoredValue = useCallback(
    (newValue: SetStateAction<T | undefined>) => {
      try {
        const newValueToStore =
          newValue instanceof Function ? (newValue as (prevValue: T | undefined) => T | undefined)(value) : newValue;
        setValue(newValueToStore);
        window.localStorage.setItem(key, JSON.stringify(newValueToStore));
      } catch (error) {
        console.error(`Error setting value to localStorage for key "${key}":`, error);
      }
    },
    [key, value]
  );

  return [value, setStoredValue];
}

export default useLocalStorage;
