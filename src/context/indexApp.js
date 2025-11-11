import React from 'react';
import { CurrencyProvider } from './CurrencyContext';
import { CartProvider } from './CartContext';
import { NotificationProvider } from './NotificationContext';
import { RatingsProvider } from './RatingsContext';

export function AppProviders({ children }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <NotificationProvider>
          <RatingsProvider>
            {children}
          </RatingsProvider>
        </NotificationProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
