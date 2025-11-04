import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CurrencyContext = createContext({
  currency: 'BRL',
  setCurrency: () => {},
  loading: true,
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('BRL');
  const [loading, setLoading] = useState(true);

  const STORAGE_KEY = '@insertcoin:currency';

  // 🔹 Carrega moeda salva
  const loadCurrency = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setCurrency(saved);
    } catch (e) {
      console.warn('Erro ao carregar moeda:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Salva moeda quando muda
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, currency)
        .then(() => console.log('Moeda salva:', currency))
        .catch((e) => console.warn('Erro ao salvar moeda:', e));
    }
  }, [currency, loading]);

  useEffect(() => {
    loadCurrency();
  }, [loadCurrency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
}
