import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CurrencyContext = createContext({
  currency: 'BRL',
  setCurrency: () => {},
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('BRL');

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('@currency');
        if (saved) setCurrency(saved);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  // salva quando muda
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('@currency', currency);
        console.log('Currency Selecionado:',currency)
      } catch (e) {
        // ignore
      }
    })();
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}