import AsyncStorage from "@react-native-async-storage/async-storage";

const RATINGS_STORAGE_KEY = "@insertCoin:ratings";
const PRODUCT_RATINGS_KEY = "@insertCoin:productRatings";

/**
 * Estrutura de dados:
 *
 * ratings = [
 *   {
 *     id: "rating_1",
 *     userId: "user_123",
 *     productId: 1,
 *     stars: 5,
 *     createdAt: "2025-01-15T10:30:00.000Z"
 *   }
 * ]
 *
 * productRatings = {
 *   "1": {
 *     productId: 1,
 *     averageRating: 4.5,
 *     totalRatings: 10
 *   }
 * }
 */

// ============ FUNÇÕES PRIVADAS ============

/**
 * Gera um ID único para uma avaliação
 */
function generateRatingId() {
  return `rating_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Busca todas as avaliações do storage
 */
async function getAllRatings() {
  try {
    const data = await AsyncStorage.getItem(RATINGS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return [];
  }
}

/**
 * Salva todas as avaliações no storage
 */
async function saveAllRatings(ratings) {
  try {
    await AsyncStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
    return true;
  } catch (error) {
    console.error("Erro ao salvar avaliações:", error);
    return false;
  }
}

/**
 * Busca as médias de avaliações dos produtos
 */
async function getProductRatingsData() {
  try {
    const data = await AsyncStorage.getItem(PRODUCT_RATINGS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Erro ao buscar dados de avaliações dos produtos:", error);
    return {};
  }
}

/**
 * Salva as médias de avaliações dos produtos
 */
async function saveProductRatingsData(productRatings) {
  try {
    await AsyncStorage.setItem(PRODUCT_RATINGS_KEY, JSON.stringify(productRatings));
    return true;
  } catch (error) {
    console.error("Erro ao salvar dados de avaliações dos produtos:", error);
    return false;
  }
}

/**
 * Recalcula a média de avaliações de um produto específico
 */
async function recalculateProductAverage(productId) {
  const allRatings = await getAllRatings();
  const productRatings = allRatings.filter(r => r.productId === productId);

  if (productRatings.length === 0) {
    return {
      averageRating: 0,
      totalRatings: 0
    };
  }

  const sum = productRatings.reduce((acc, rating) => acc + rating.stars, 0);
  const average = sum / productRatings.length;

  return {
    averageRating: Math.round(average * 10) / 10, // Arredonda para 1 casa decimal
    totalRatings: productRatings.length
  };
}

// ============ FUNÇÕES PÚBLICAS ============

/**
 * Adiciona ou atualiza uma avaliação de produto
 * @param {string} userId - ID do usuário
 * @param {number} productId - ID do produto
 * @param {number} stars - Número de estrelas (1-5)
 * @returns {Promise<{success: boolean, data: object}>}
 */
export async function addOrUpdateRating(userId, productId, stars) {
  try {
    if (!userId || !productId || stars < 1 || stars > 5) {
      return {
        success: false,
        error: "Parâmetros inválidos"
      };
    }

    const allRatings = await getAllRatings();

    // Verifica se o usuário já avaliou este produto
    const existingRatingIndex = allRatings.findIndex(
      r => r.userId === userId && r.productId === productId
    );

    if (existingRatingIndex >= 0) {
      // Atualiza avaliação existente
      allRatings[existingRatingIndex] = {
        ...allRatings[existingRatingIndex],
        stars,
        updatedAt: new Date().toISOString()
      };
    } else {
      // Cria nova avaliação
      const newRating = {
        id: generateRatingId(),
        userId,
        productId,
        stars,
        createdAt: new Date().toISOString()
      };
      allRatings.push(newRating);
    }

    // Salva as avaliações
    await saveAllRatings(allRatings);

    // Recalcula a média do produto
    const productData = await recalculateProductAverage(productId);

    // Atualiza os dados agregados do produto
    const allProductRatings = await getProductRatingsData();
    allProductRatings[productId] = {
      productId,
      ...productData
    };
    await saveProductRatingsData(allProductRatings);

    return {
      success: true,
      data: {
        rating: allRatings[existingRatingIndex >= 0 ? existingRatingIndex : allRatings.length - 1],
        productData: allProductRatings[productId]
      }
    };
  } catch (error) {
    console.error("Erro ao adicionar/atualizar avaliação:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Busca a avaliação de um usuário para um produto específico
 * @param {string} userId - ID do usuário
 * @param {number} productId - ID do produto
 * @returns {Promise<object|null>}
 */
export async function getUserRating(userId, productId) {
  try {
    const allRatings = await getAllRatings();
    return allRatings.find(r => r.userId === userId && r.productId === productId) || null;
  } catch (error) {
    console.error("Erro ao buscar avaliação do usuário:", error);
    return null;
  }
}

/**
 * Verifica se um usuário já avaliou um produto
 * @param {string} userId - ID do usuário
 * @param {number} productId - ID do produto
 * @returns {Promise<boolean>}
 */
export async function hasUserRated(userId, productId) {
  const rating = await getUserRating(userId, productId);
  return rating !== null;
}

/**
 * Busca a média de avaliações de um produto
 * @param {number} productId - ID do produto
 * @returns {Promise<{averageRating: number, totalRatings: number}>}
 */
export async function getProductRating(productId) {
  try {
    const productRatings = await getProductRatingsData();
    return productRatings[productId] || { averageRating: 0, totalRatings: 0 };
  } catch (error) {
    console.error("Erro ao buscar avaliação do produto:", error);
    return { averageRating: 0, totalRatings: 0 };
  }
}

/**
 * Busca todas as avaliações de um produto
 * @param {number} productId - ID do produto
 * @returns {Promise<Array>}
 */
export async function getProductRatings(productId) {
  try {
    const allRatings = await getAllRatings();
    return allRatings.filter(r => r.productId === productId);
  } catch (error) {
    console.error("Erro ao buscar avaliações do produto:", error);
    return [];
  }
}

/**
 * Remove uma avaliação (opcional - para fins administrativos)
 * @param {string} userId - ID do usuário
 * @param {number} productId - ID do produto
 * @returns {Promise<boolean>}
 */
export async function removeRating(userId, productId) {
  try {
    const allRatings = await getAllRatings();
    const filteredRatings = allRatings.filter(
      r => !(r.userId === userId && r.productId === productId)
    );

    await saveAllRatings(filteredRatings);

    // Recalcula a média do produto
    const productData = await recalculateProductAverage(productId);
    const allProductRatings = await getProductRatingsData();

    if (productData.totalRatings === 0) {
      delete allProductRatings[productId];
    } else {
      allProductRatings[productId] = {
        productId,
        ...productData
      };
    }

    await saveProductRatingsData(allProductRatings);

    return true;
  } catch (error) {
    console.error("Erro ao remover avaliação:", error);
    return false;
  }
}

/**
 * Limpa todas as avaliações (para fins de desenvolvimento/teste)
 * @returns {Promise<boolean>}
 */
export async function clearAllRatings() {
  try {
    await AsyncStorage.removeItem(RATINGS_STORAGE_KEY);
    await AsyncStorage.removeItem(PRODUCT_RATINGS_KEY);
    return true;
  } catch (error) {
    console.error("Erro ao limpar avaliações:", error);
    return false;
  }
}

/**
 * Busca as avaliações médias de múltiplos produtos de uma vez
 * @param {Array<number>} productIds - Array de IDs de produtos
 * @returns {Promise<Object>} Objeto com productId como chave e dados de avaliação como valor
 */
export async function getBulkProductRatings(productIds) {
  try {
    const allProductRatings = await getProductRatingsData();
    const result = {};

    productIds.forEach(productId => {
      result[productId] = allProductRatings[productId] || {
        averageRating: 0,
        totalRatings: 0
      };
    });

    return result;
  } catch (error) {
    console.error("Erro ao buscar avaliações em lote:", error);
    return {};
  }
}
