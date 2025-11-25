import api from './authService';

/**
 * GET /products
 * Lista todos os produtos
 */
export const getProducts = async (currency = null) => {
  try {
    const params = currency ? { curr: currency } : {};
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

/**
 * GET /products/:id
 * Obtém detalhes de um produto específico
 * @param {string} productId - ID do produto
 * @param {string} currency - Moeda para conversão (opcional: BRL, USD)
 */
export const getProductById = async (productId, currency = null) => {
  try {
    const params = currency ? { curr: currency } : {};
    const response = await api.get(`/products/${productId}`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    throw error;
  }
};

/**
 * POST /products/rating/:productId
 * Adiciona avaliação para um produto
 */
export const rateProduct = async (productId, rating) => {
  try {
    const response = await api.post(`/products/rating/${productId}`, { rating });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * GET /products/categories
 * Lista todas as categorias disponíveis
 */
export const getCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * GET /products/platforms
 * Lista todas as plataformas disponíveis
 */
export const getPlatforms = async () => {
  try {
    const response = await api.get('/products/platforms');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============ ADMIN ENDPOINTS ============

export const addProduct = async (productData) => {
  try {
    const response = await api.post('/products/admin/addProduct', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/admin/removeProduct/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/products/admin/updateProduct/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getProducts,
  getProductById,
  rateProduct,
  getCategories,
  getPlatforms,
  addProduct,
  removeProduct,
  updateProduct,
};
