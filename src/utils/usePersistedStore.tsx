import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';

export const usePersistedStore = <T,>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const getValue = async () => {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    };
    getValue();
  }, [key]);

  useEffect(() => {
    const setValue = async () => {
      await AsyncStorage.setItem(key, JSON.stringify(storedValue));
    };

    setValue();
  }, [JSON.stringify(storedValue)]);

  return [storedValue, setStoredValue];
};
