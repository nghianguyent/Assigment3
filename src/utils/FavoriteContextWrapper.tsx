import {createContext, useCallback, useEffect, useMemo, useState} from 'react';
import {usePersistedStore} from './usePersistedStore';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FavoriteContextType = {
  favoriteList: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  clear: () => void;
};

export const favoriteContext = createContext<FavoriteContextType>({
  favoriteList: [],
  isFavorite: () => false,
  clear: () => {},
  toggleFavorite: () => {},
});

const FavoriteContextWrapper = ({children}: {children: React.ReactNode}) => {
  const [favData, setFavData] = usePersistedStore<number[]>('favoriteList', []);

  const isFavorite = (id: number) => {
    return favData.includes(id);
  };

  const setDataToStorage = async (id: number) => {
    const list: number[] = [...favData];
    list.push(id);
    setFavData(list);
  };

  const removeDataFromStorage = async (id: number) => {
    const list = [...favData].filter(item => item !== id) ?? [];
    setFavData(list);
  };

  const toggleFavorite = async (id: number) => {
    const favorite = isFavorite(id);
    if (favorite) {
      removeDataFromStorage(id);
    } else {
      setDataToStorage(id);
    }
  };

  const clear = async () => {
    setFavData([]);
  };

  return (
    <favoriteContext.Provider
      value={{
        isFavorite,
        favoriteList: favData,
        toggleFavorite,
        clear,
      }}>
      {children}
    </favoriteContext.Provider>
  );
};

export default FavoriteContextWrapper;
