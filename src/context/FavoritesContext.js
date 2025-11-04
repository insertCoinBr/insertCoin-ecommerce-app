// src/context/FavoritesContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITES_STORAGE_KEY } from '../constants/storageKeys';

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
  loading: false,
});

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📦 Carrega favoritos ao iniciar
  useEffect(() => {
    loadFavorites();
  }, []);

  // 📦 Carrega favoritos do AsyncStorage
  const loadFavorites = async () => {
    try {
      setLoading(true);
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (favoritesJson) {
        const favs = JSON.parse(favoritesJson);
        setFavorites(favs);
        console.log(`✅ ${favs.length} favoritos carregados`);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  // 💾 Salva favoritos no AsyncStorage
  const saveFavorites = async (favs) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
      console.log(`💾 ${favs.length} favoritos salvos`);
    } catch (error) {
      console.error('❌ Erro ao salvar favoritos:', error);
      throw error;
    }
  };

  // ❤️ Adiciona aos favoritos
  const addToFavorites = async (product) => {
    try {
      // Verifica se já existe
      const alreadyExists = favorites.some(fav => fav.id === product.id);
      if (alreadyExists) {
        console.log('⚠️ Produto já está nos favoritos');
        return false;
      }

      const newFavorite = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: parseFloat(product.price),
        category: product.category || 'Sem categoria',
        addedAt: new Date().toISOString(), // Data de adição
      };

      const updatedFavorites = [...favorites, newFavorite];

      setFavorites(updatedFavorites);
      await saveFavorites(updatedFavorites);
      console.log(`❤️ Adicionado aos favoritos: ${product.title}`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao adicionar aos favoritos:', error);
      return false;
    }
  };

  // 💔 Remove dos favoritos
  const removeFromFavorites = async (productId) => {
    try {
      const productToRemove = favorites.find(fav => fav.id === productId);
      const updatedFavorites = favorites.filter(fav => fav.id !== productId);
      
      setFavorites(updatedFavorites);
      await saveFavorites(updatedFavorites);
      
      if (productToRemove) {
        console.log(`💔 Removido dos favoritos: ${productToRemove.title}`);
      }
      return true;
    } catch (error) {
      console.error('❌ Erro ao remover dos favoritos:', error);
      return false;
    }
  };

  // 🔍 Verifica se está nos favoritos
  const isFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId);
  };

  // 🔄 Toggle favorito (adiciona se não existe, remove se existe)
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
      console.error('❌ Erro ao alternar favorito:', error);
      return false;
    }
  };

  // 🧹 Limpa todos os favoritos
  const clearFavorites = async () => {
    try {
      setFavorites([]);
      await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
      console.log('🧹 Todos os favoritos foram removidos');
      return true;
    } catch (error) {
      console.error('❌ Erro ao limpar favoritos:', error);
      return false;
    }
  };

  // 🔢 Conta total de favoritos
  const getFavoritesCount = () => {
    return favorites.length;
  };

  // 🔍 Obtém um favorito específico
  const getFavoriteById = (productId) => {
    return favorites.find(fav => fav.id === productId) || null;
  };

  // 📊 Ordena favoritos por data de adição (mais recentes primeiro)
  const getFavoritesSortedByDate = () => {
    return [...favorites].sort((a, b) => {
      const dateA = new Date(a.addedAt || 0);
      const dateB = new Date(b.addedAt || 0);
      return dateB - dateA; // Mais recente primeiro
    });
  };

  // 💰 Ordena favoritos por preço
  const getFavoritesSortedByPrice = (ascending = true) => {
    return [...favorites].sort((a, b) => {
      if (ascending) {
        return a.price - b.price; // Menor preço primeiro
      }
      return b.price - a.price; // Maior preço primeiro
    });
  };

  // 🏷️ Filtra favoritos por categoria
  const getFavoritesByCategory = (category) => {
    if (!category) return favorites;
    return favorites.filter(fav => 
      fav.category.toLowerCase().includes(category.toLowerCase())
    );
  };

  // 🔍 Busca favoritos por nome
  const searchFavorites = (searchTerm) => {
    if (!searchTerm) return favorites;
    const term = searchTerm.toLowerCase();
    return favorites.filter(fav =>
      fav.title.toLowerCase().includes(term)
    );
  };

  // 💰 Calcula valor total dos favoritos
  const getTotalFavoritesValue = () => {
    return favorites.reduce((total, fav) => total + parseFloat(fav.price), 0);
  };

  // 📋 Obtém categorias únicas dos favoritos
  const getFavoriteCategories = () => {
    const categories = favorites.map(fav => fav.category);
    return [...new Set(categories)].filter(cat => cat !== 'Sem categoria');
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
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}