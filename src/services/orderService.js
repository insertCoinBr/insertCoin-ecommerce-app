import api from './authService';

/**
 * Serviço para gerenciamento de pedidos
 * Integração com as APIs de Orders
 */

// ============ CLIENT ENDPOINTS ============

/**
 * POST /orders
 * Cria um novo pedido com PIX
 * @param {Object} orderData - Dados do pedido
 * @param {Array} orderData.items - Lista de itens [{productId, quantity}]
 * @param {string} orderData.paymentMethod - Método de pagamento: "PIX" ou "CARD"
 * @param {string} orderData.currency - Moeda (BRL, USD, etc)
 * @returns {Promise} Resposta da API com detalhes do pedido
 */
export const createOrderPix = async (orderData) => {
  try {
    const { items, currency = 'BRL' } = orderData;
    const response = await api.post('/orders', {
      items,
      paymentMethod: 'PIX',
      currency
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * POST /orders
 * Cria um novo pedido com Cartão de Crédito
 * @param {Object} orderData - Dados do pedido
 * @param {Array} orderData.items - Lista de itens [{productId, quantity}]
 * @param {string} orderData.currency - Moeda (BRL, USD, etc)
 * @param {Object} orderData.card - Dados do cartão
 * @param {string} orderData.card.number - Número do cartão
 * @param {string} orderData.card.holderName - Nome do titular
 * @param {number} orderData.card.expiryMonth - Mês de expiração (1-12)
 * @param {number} orderData.card.expiryYear - Ano de expiração
 * @param {string} orderData.card.cvv - CVV
 * @returns {Promise} Resposta da API com detalhes do pedido
 */
export const createOrderCard = async (orderData) => {
  try {
    const { items, currency = 'BRL', card } = orderData;
    const response = await api.post('/orders', {
      items,
      paymentMethod: 'CARD',
      currency,
      card
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * POST /orders
 * Cria um novo pedido (genérico)
 * @param {Object} orderData - Dados completos do pedido
 * @returns {Promise} Resposta da API com detalhes do pedido
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * GET /orders/:orderId
 * Obtém detalhes de um pedido específico
 * @param {string} orderId - ID do pedido
 * @param {string} currency - Moeda para conversão (opcional)
 * @returns {Promise} Dados do pedido
 */
export const getOrderById = async (orderId, currency = null) => {
  try {
    const params = currency ? { currency } : {};
    const response = await api.get(`/orders/${orderId}`, { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * GET /orders/user
 * Lista pedidos do usuário logado
 * @param {Object} params - Parâmetros de busca
 * @param {string} params.currency - Moeda para conversão (opcional)
 * @param {string} params.status - Filtrar por status (opcional)
 * @param {string} params.orderBy - Campo para ordenar (default: createdAt)
 * @param {string} params.direction - Direção da ordenação: asc ou desc (default: desc)
 * @returns {Promise} Lista de pedidos do usuário
 */
export const getUserOrders = async (params = {}) => {
  try {
    const {
      currency = null,
      status = '',
      orderBy = 'createdAt',
      direction = 'desc'
    } = params;

    const queryParams = {
      orderBy,
      direction
    };

    if (currency) queryParams.currency = currency;
    if (status) queryParams.status = status;

    const response = await api.get('/orders/user', { params: queryParams });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// ============ ADMIN ENDPOINTS ============

/**
 * GET /orders/admin/searchOrder
 * Busca pedidos (admin) com paginação e filtros
 * @param {Object} params - Parâmetros de busca
 * @param {string} params.status - Filtrar por status (opcional)
 * @param {string} params.orderNumber - Filtrar por número do pedido (opcional)
 * @param {number} params.page - Número da página (default: 0)
 * @param {number} params.size - Tamanho da página (default: 10)
 * @returns {Promise} Lista paginada de pedidos
 */
export const searchOrders = async (params = {}) => {
  try {
    const {
      status = '',
      orderNumber = '',
      page = 0,
      size = 10
    } = params;

    const queryParams = {
      page,
      size
    };

    if (status) queryParams.status = status;
    if (orderNumber) queryParams.orderNumber = orderNumber;

    const response = await api.get('/orders/admin/searchOrder', { params: queryParams });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * GET /orders/admin/dataOrder/:orderId
 * Obtém detalhes de um pedido específico (admin)
 * @param {string} orderId - ID do pedido
 * @param {string} currency - Moeda para conversão (opcional)
 * @returns {Promise} Dados do pedido
 */
export const getAdminOrderById = async (orderId, currency = null) => {
  try {
    const params = currency ? { currency } : {};
    const response = await api.get(`/orders/admin/dataOrder/${orderId}`, { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * GET /orders/admin/ordersUser/:userId
 * Obtém pedidos de um usuário específico (admin)
 * @param {string} userId - ID do usuário
 * @param {string} currency - Moeda para conversão (opcional)
 * @returns {Promise} Lista de pedidos do usuário
 */
export const getAdminUserOrders = async (userId, currency = null) => {
  try {
    const params = currency ? { currency } : {};
    const response = await api.get(`/orders/admin/ordersUser/${userId}`, { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * DELETE /orders/admin/deleteOrder/:orderId
 * Deleta um pedido (admin)
 * @param {string} orderId - ID do pedido
 * @returns {Promise} Resposta da API
 */
export const deleteOrder = async (orderId) => {
  try {
    const response = await api.delete(`/orders/admin/deleteOrder/${orderId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// ============ FUNÇÕES AUXILIARES ============

/**
 * Função auxiliar para tratar erros da API
 * @param {Error} error - Erro retornado pela API
 * @returns {Error} Erro formatado
 */
const handleApiError = (error) => {
  if (error.response) {
    const message = error.response.data?.message || error.response.data?.error || 'Erro ao processar requisição';
    const statusCode = error.response.status;

    const customError = new Error(message);
    customError.statusCode = statusCode;
    customError.data = error.response.data;

    return customError;
  } else if (error.request) {
    return new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
  } else {
    return new Error(error.message || 'Erro desconhecido');
  }
};

export default {
  createOrder,
  createOrderPix,
  createOrderCard,
  getOrderById,
  getUserOrders,
  searchOrders,
  getAdminOrderById,
  getAdminUserOrders,
  deleteOrder,
};
