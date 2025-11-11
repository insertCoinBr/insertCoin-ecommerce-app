import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import {
  addOrUpdateRating,
  getUserRating,
  getProductRating,
  getBulkProductRatings,
  hasUserRated
} from "../services/ratingsService";

export const RatingsContext = createContext();

export function RatingsProvider({ children }) {
  const { email } = useContext(AuthContext);
  const [productRatings, setProductRatings] = useState({});
  const [userRatings, setUserRatings] = useState({});
  const [loading, setLoading] = useState(false);

  /**
   * Adiciona ou atualiza a avaliação de um usuário para um produto
   * @param {number} productId - ID do produto
   * @param {number} stars - Número de estrelas (1-5)
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  const rateProduct = async (productId, stars) => {
    if (!email) {
      return {
        success: false,
        error: "Usuário não autenticado"
      };
    }

    setLoading(true);

    try {
      const result = await addOrUpdateRating(email, productId, stars);

      if (result.success) {
        // Atualiza o estado local com a nova avaliação do produto
        setProductRatings(prev => ({
          ...prev,
          [productId]: result.data.productData
        }));

        // Atualiza o estado local com a avaliação do usuário
        setUserRatings(prev => ({
          ...prev,
          [productId]: result.data.rating
        }));
      }

      setLoading(false);
      return result;
    } catch (error) {
      console.error("Erro ao avaliar produto:", error);
      setLoading(false);
      return {
        success: false,
        error: error.message
      };
    }
  };

  /**
   * Busca a avaliação média de um produto
   * @param {number} productId - ID do produto
   * @returns {Promise<{averageRating: number, totalRatings: number}>}
   */
  const getProductRatingData = async (productId) => {
    // Verifica se já tem no cache
    if (productRatings[productId]) {
      return productRatings[productId];
    }

    try {
      const rating = await getProductRating(productId);

      // Atualiza o cache
      setProductRatings(prev => ({
        ...prev,
        [productId]: rating
      }));

      return rating;
    } catch (error) {
      console.error("Erro ao buscar avaliação do produto:", error);
      return { averageRating: 0, totalRatings: 0 };
    }
  };

  /**
   * Busca as avaliações de múltiplos produtos de uma vez
   * @param {Array<number>} productIds - Array de IDs de produtos
   * @returns {Promise<Object>}
   */
  const loadBulkProductRatings = async (productIds) => {
    try {
      const ratings = await getBulkProductRatings(productIds);

      // Atualiza o cache com todos os ratings
      setProductRatings(prev => ({
        ...prev,
        ...ratings
      }));

      return ratings;
    } catch (error) {
      console.error("Erro ao buscar avaliações em lote:", error);
      return {};
    }
  };

  /**
   * Verifica se o usuário já avaliou um produto
   * @param {number} productId - ID do produto
   * @returns {boolean}
   */
  const hasRated = (productId) => {
    if (!email) return false;
    return !!userRatings[productId];
  };

  /**
   * Busca a avaliação do usuário para um produto específico
   * @param {number} productId - ID do produto
   * @returns {object|null}
   */
  const getUserRatingData = (productId) => {
    if (!email) return null;
    return userRatings[productId] || null;
  };

  /**
   * Carrega as avaliações do usuário ao fazer login
   */
  const loadUserRatings = async () => {
    if (!email) return;

    try {
      // Aqui você pode implementar uma função que busca todas as avaliações do usuário
      // Por enquanto, vamos deixar vazio e carregar conforme necessário
    } catch (error) {
      console.error("Erro ao carregar avaliações do usuário:", error);
    }
  };

  /**
   * Limpa o cache de avaliações do usuário ao fazer logout
   */
  useEffect(() => {
    if (email) {
      loadUserRatings();
    } else {
      // Limpa os dados ao fazer logout
      setUserRatings({});
    }
  }, [email]);

  const value = {
    // Estados
    productRatings,
    userRatings,
    loading,

    // Funções
    rateProduct,
    getProductRatingData,
    loadBulkProductRatings,
    hasRated,
    getUserRatingData,
  };

  return (
    <RatingsContext.Provider value={value}>
      {children}
    </RatingsContext.Provider>
  );
}
