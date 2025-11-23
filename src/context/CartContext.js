import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CART_STORAGE_KEY } from './storageKeys';

export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  addMultipleToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartCount: () => 0,
  isInCart: () => false,
  getItemQuantity: () => 0,
  loading: false,
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const cartJson = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (cartJson) {
        const cart = JSON.parse(cartJson);
        setCartItems(cart);
        // console.log(`${cart.length} itens carregados no carrinho`);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCart = async (cart) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      // console.log(`Carrinho salvo: ${cart.length} itens`);
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
      throw error;
    }
  };

  const addToCart = async (product) => {
    try {
      const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
      let updatedCart;

      if (existingItemIndex >= 0) {
        updatedCart = cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        // console.log(`Quantidade incrementada: ${product.title}`);
      } else {
        const newItem = {
          id: product.id,
          title: product.title,
          image: product.image,
          price: parseFloat(product.price),
          quantity: 1,
        };
        updatedCart = [...cartItems, newItem];
        // console.log(`Adicionado ao carrinho: ${product.title}`);
      }

      setCartItems(updatedCart);
      await saveCart(updatedCart);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      return false;
    }
  };

  const addMultipleToCart = async (products) => {
    try {
      if (!products || products.length === 0) {
        return { success: false, addedCount: 0 };
      }

      let updatedCart = [...cartItems];
      let addedCount = 0;

      for (const product of products) {
        const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);

        if (existingItemIndex >= 0) {
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + 1
          };
          // console.log(`Quantidade incrementada: ${product.title}`);
          addedCount++;
        } else {
          const newItem = {
            id: product.id,
            title: product.title,
            image: product.image,
            price: parseFloat(product.price),
            quantity: 1,
          };
          updatedCart.push(newItem);
          // console.log(`Adicionado ao carrinho: ${product.title}`);
          addedCount++;
        }
      }

      setCartItems(updatedCart);
      await saveCart(updatedCart);
      // console.log(`${addedCount} itens adicionados ao carrinho`);
      return { success: true, addedCount };
    } catch (error) {
      console.error('Erro ao adicionar múltiplos itens ao carrinho:', error);
      return { success: false, addedCount: 0 };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const itemToRemove = cartItems.find(item => item.id === productId);
      const updatedCart = cartItems.filter(item => item.id !== productId);
      
      setCartItems(updatedCart);
      await saveCart(updatedCart);
      
      if (itemToRemove) {
        // console.log(`Removido do carrinho: ${itemToRemove.title}`);
      }
      return true;
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
      return false;
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        return await removeFromCart(productId);
      }

      const updatedCart = cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );

      setCartItems(updatedCart);
      await saveCart(updatedCart);
      // console.log(`Quantidade atualizada para: ${newQuantity}`);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      return false;
    }
  };

  const incrementQuantity = async (productId) => {
    try {
      const item = cartItems.find(i => i.id === productId);
      if (!item) return false;
      
      return await updateQuantity(productId, item.quantity + 1);
    } catch (error) {
      console.error('Erro ao incrementar quantidade:', error);
      return false;
    }
  };

  const decrementQuantity = async (productId) => {
    try {
      const item = cartItems.find(i => i.id === productId);
      if (!item) return false;

      if (item.quantity <= 1) {
        return await removeFromCart(productId);
      }
      
      return await updateQuantity(productId, item.quantity - 1);
    } catch (error) {
      console.error('Erro ao decrementar quantidade:', error);
      return false;
    }
  };

  const clearCart = async () => {
    try {
      setCartItems([]);
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
      // console.log('Carrinho limpo');
      return true;
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      return false;
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isInCart,
        getItemQuantity,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}