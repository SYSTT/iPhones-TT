import { useEffect, useState } from 'react';

export function useStateWithLocalStorage<T>(
  localStorageKey: string,
  defaultVal: T | null = null
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(
    JSON.parse(localStorage.getItem(localStorageKey) || JSON.stringify(defaultVal))
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return [value, setValue];
};
