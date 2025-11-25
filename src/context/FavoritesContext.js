import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITES_STORAGE_KEY } from '../context/storageKeys';
import { getProducts } from '../services/productService';

export const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
  toggleFavorite: () => {},
  clearFavorites: () => {},
  getFavoritesCount: () => 0,
  getFavoriteById: () => null,
  getFavoritesSortedByDate: () => [],
  getFavoritesSortedByPrice: () => [],
  validateFavorites: () => {},
  loading: false,
});

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavoritesFromCache();
  }, []);

  const loadFavoritesFromCache = async () => {
    try {
      setLoading(true);
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (favoritesJson) {
        const favs = JSON.parse(favoritesJson);
        setFavorites(favs);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos do cache:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (favs) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
      // console.log(`${favs.length} favoritos salvos`);
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
      throw error;
    }
  };

  const addToFavorites = async (product) => {
    try {
      const alreadyExists = favorites.some(fav => fav.id === product.id);
      if (alreadyExists) {
        // console.log('Produto já está nos favoritos');
        return false;
      }

      const newFavorite = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: parseFloat(product.price),
        category: product.category || 'Sem categoria',
        addedAt: new Date().toISOString(),
      };

      const updatedFavorites = [...favorites, newFavorite];

      setFavorites(updatedFavorites);
      await saveFavorites(updatedFavorites);
      // console.log(`Adicionado aos favoritos: ${product.title}`);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
      return false;
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      const productToRemove = favorites.find(fav => fav.id === productId);
      const updatedFavorites = favorites.filter(fav => fav.id !== productId);
      
      setFavorites(updatedFavorites);
      await saveFavorites(updatedFavorites);
      
      if (productToRemove) {
        // console.log(`Removido dos favoritos: ${productToRemove.title}`);
      }
      return true;
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error);
      return false;
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId);
  };

  const toggleFavorite = async (product) => {
    try {
      if (isFavorite(product.id)) {
        const success = await removeFromFavorites(product.id);
        return success;
      } else {
        const success = await addToFavorites(product);
        return success;
      }
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
      return false;
    }
  };

  const clearFavorites = async () => {
    try {
      setFavorites([]);
      await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
      // console.log('Todos os favoritos foram removidos');
      return true;
    } catch (error) {
      console.error('Erro ao limpar favoritos:', error);
      return false;
    }
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const getFavoriteById = (productId) => {
    return favorites.find(fav => fav.id === productId) || null;
  };

  const getFavoritesSortedByDate = () => {
    return [...favorites].sort((a, b) => {
      const dateA = new Date(a.addedAt || 0);
      const dateB = new Date(b.addedAt || 0);
      return dateB - dateA;
    });
  };

  const getFavoritesSortedByPrice = (ascending = true) => {
    return [...favorites].sort((a, b) => {
      if (ascending) {
        return a.price - b.price;
      }
      return b.price - a.price;
    });
  };

  const getFavoritesByCategory = (category) => {
    if (!category) return favorites;
    return favorites.filter(fav => 
      fav.category.toLowerCase().includes(category.toLowerCase())
    );
  };

  const searchFavorites = (searchTerm) => {
    if (!searchTerm) return favorites;
    const term = searchTerm.toLowerCase();
    return favorites.filter(fav =>
      fav.title.toLowerCase().includes(term)
    );
  };

  const getTotalFavoritesValue = () => {
    return favorites.reduce((total, fav) => total + parseFloat(fav.price), 0);
  };

  const getFavoriteCategories = () => {
    const categories = favorites.map(fav => fav.category);
    return [...new Set(categories)].filter(cat => cat !== 'Sem categoria');
  };

  // Validar favoritos manualmente (pode ser chamado quando necessário)
  const validateFavorites = async () => {
    try {
      const storeProducts = await getProducts();
      const availableProductIds = new Set(
        storeProducts.map(p => p.uuid || p.id)
      );

      const validFavorites = favorites.filter(fav =>
        availableProductIds.has(fav.id)
      );

      if (validFavorites.length !== favorites.length) {
        setFavorites(validFavorites);
        await saveFavorites(validFavorites);
        return {
          validated: true,
          removed: favorites.length - validFavorites.length
        };
      }

      return { validated: true, removed: 0 };
    } catch (error) {
      console.error('Erro ao validar favoritos:', error);
      return { validated: false, removed: 0 };
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        clearFavorites,
        getFavoritesCount,
        getFavoriteById,
        getFavoritesSortedByDate,
        getFavoritesSortedByPrice,
        getFavoritesByCategory,
        searchFavorites,
        getTotalFavoritesValue,
        getFavoriteCategories,
        validateFavorites,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}