import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENCY_STORAGE_KEY = '@insertcoin:currency';

// Configuração das moedas disponíveis
const CURRENCIES = {
  BRL: {
    symbol: 'R$',
    code: 'BRL',
    name: 'Real Brasileiro',
    locale: 'pt-BR',
  },
  USD: {
    symbol: 'US$',
    code: 'USD',
    name: 'Dólar Americano',
    locale: 'en-US',
  },
};

export const CurrencyContext = createContext({
  currency: 'BRL',
  currencySymbol: 'R$',
  setCurrency: () => {},
  formatPrice: () => '0,00',
  loading: false,
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState('BRL');
  const [loading, setLoading] = useState(true);

  const loadCurrency = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && CURRENCIES[saved]) {
        setCurrencyState(saved);
        console.log(`Moeda carregada: ${saved}`);
      }
    } catch (e) {
      console.warn('Erro ao carregar moeda:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCurrency();
  }, [loadCurrency]);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(CURRENCY_STORAGE_KEY, currency)
        .then(() => console.log(`Moeda salva: ${currency}`))
        .catch((e) => console.warn('Erro ao salvar moeda:', e));
    }
  }, [currency, loading]);

  const setCurrency = async (newCurrency) => {
    if (!CURRENCIES[newCurrency]) {
      console.error('Moeda inválida:', newCurrency);
      return;
    }

    setCurrencyState(newCurrency);
    console.log(`Moeda alterada para: ${newCurrency}`);
  };

  const formatPrice = (value) => {
    const currencyData = CURRENCIES[currency];
    const numValue = parseFloat(value || 0);

    if (currency === 'BRL') {
      return `${currencyData.symbol} ${numValue.toFixed(2).replace('.', ',')}`;
    } else {
      return `${currencyData.symbol} ${numValue.toFixed(2)}`;
    }
  };

  const getCurrencyData = () => {
    return CURRENCIES[currency];
  };

  const getAvailableCurrencies = () => {
    return Object.keys(CURRENCIES).map(code => ({
      code,
      ...CURRENCIES[code],
    }));
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencySymbol: CURRENCIES[currency].symbol,
        currencyData: CURRENCIES[currency],
        setCurrency,
        formatPrice,
        getCurrencyData,
        getAvailableCurrencies,
        loading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}
