import React from 'react';
import { CurrencyProvider } from './CurrencyContext';
import { CartProvider } from './CartContext';
import { NotificationProvider } from './NotificationContext';

export function AppProviders({ children }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
