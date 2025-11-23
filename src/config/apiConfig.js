import Constants from 'expo-constants';

/**
 * Configuração centralizada de URLs/IPs da API
 *
 * O IP da máquina é detectado automaticamente através do Expo
 * - Certifique-se que seu dispositivo/emulador está na mesma rede WiFi
 */

// ============ DETECÇÃO AUTOMÁTICA DE IP ============

/**
 * Obtém o IP local automaticamente do servidor de desenvolvimento Expo
 */
const getLocalIP = () => {
  try {
    // Tenta pegar o IP do debuggerHost (Expo SDK novo)
    let debuggerHost = Constants.expoConfig?.hostUri ||
                       Constants.manifest2?.extra?.expoGo?.debuggerHost ||
                       Constants.manifest?.debuggerHost;

    if (debuggerHost) {
      const ip = debuggerHost.split(':')[0];
      // console.log('[API Config] IP detectado automaticamente:', ip);
      return ip;
    }

    // Fallback para IP padrão caso não consiga detectar
    // console.warn('[API Config] Não foi possível detectar IP, usando fallback: localHost');
    return 'localHost';
  } catch (error) {
    console.error('[API Config] Erro ao detectar IP:', error);
    return 'localHost';
  }
};

// ============ URLs BASE DOS SERVIÇOS ============

const LOCAL_IP = getLocalIP();

export const API_URLS = {
  // Gateway Principal (Autenticação e endpoints principais)
  // IP detectado automaticamente: ${LOCAL_IP}
  GATEWAY: `http://${LOCAL_IP}:8765`,
};

// ============ ENDPOINTS DE AUTENTICAÇÃO ============

export const AUTH_ENDPOINTS = {
  VERIFY_EMAIL: '/auth/verify-email',
  VALIDATE_CODE: '/auth/validate-code',
  SIGNUP: '/auth/signup',
  SIGNIN: '/auth/signin',
  RESET_PASSWORD: '/auth/reset-password',
  FORGOT_PASSWORD: '/auth/forgot-password',
  ME: '/auth/me',
  ME_UPDATE: '/auth/me/update',
};

// ============ ENDPOINTS DE ADMIN ============

export const ADMIN_ENDPOINTS = {
  SIGNUP: '/auth/admin/signup',
  EMPLOYEES_UPDATE: '/auth/admin/employees/update', // /:id
  CLIENTS_UPDATE: '/auth/admin/clients/update', // /:id
  USER_BY_ID: '/auth/admin/users', // /:id
  EMPLOYEES_SEARCH: '/auth/admin/employees/search',
  CLIENTS_SEARCH: '/auth/admin/clients/search',
};

// ============ ENDPOINTS DE CURRENCY ============

export const CURRENCY_ENDPOINTS = {
  CONVERSION: '/currency', // /:amount/:from/:to
};

// ============ ENDPOINTS DE PRODUCTS ============

export const PRODUCT_ENDPOINTS = {
  LIST: '/products',
  BY_ID: '/products', // /:id
  RATING: '/products/rating', // /:productId
  CATEGORIES: '/products/categories',
  PLATFORMS: '/products/platforms',
  // Admin endpoints
  ADD: '/ws/products/addProduct',
  REMOVE: '/ws/products/removeProduct', // /:id
  UPDATE: '/ws/products/updateProduct', // /:id
};

// ============ ENDPOINTS DE ORDERS ============

export const ORDER_ENDPOINTS = {
  CREATE: '/orders',
  BY_ID: '/orders', // /:orderId
  USER_ORDERS: '/orders/user',
  // Admin endpoints
  DELETE: '/orders/admin/deleteOrder', // /:orderId
};

// ============ FUNÇÕES HELPER ============

/**
 * Constrói URL completa combinando base + endpoint
 * @param {string} baseUrl - URL base do serviço
 * @param {string} endpoint - Endpoint específico
 * @returns {string} URL completa
 */
export const buildUrl = (baseUrl, endpoint) => {
  return `${baseUrl}${endpoint}`;
};

/**
 * Constrói URL completa para endpoints de autenticação
 * @param {string} endpoint - Endpoint de autenticação
 * @returns {string} URL completa
 */
export const getAuthUrl = (endpoint) => {
  return buildUrl(API_URLS.GATEWAY, endpoint);
};

/**
 * Constrói URL completa para endpoints de currency
 * @param {string} endpoint - Endpoint de currency
 * @returns {string} URL completa
 */
export const getCurrencyUrl = (endpoint) => {
  return buildUrl(API_URLS.CURRENCY_SERVICE, endpoint);
};

/**
 * Constrói URL completa para endpoints de produtos
 * @param {string} endpoint - Endpoint de produtos
 * @returns {string} URL completa
 */
export const getProductUrl = (endpoint) => {
  return buildUrl(API_URLS.PRODUCT_SERVICE, endpoint);
};


/**
 * Constrói URL completa para endpoints de orders
 * @param {string} endpoint - Endpoint de orders
 * @returns {string} URL completa
 */
export const getOrderUrl = (endpoint) => {
  return buildUrl(API_URLS.GATEWAY, endpoint);
};

export default {
  API_URLS,
  AUTH_ENDPOINTS,
  ADMIN_ENDPOINTS,
  CURRENCY_ENDPOINTS,
  PRODUCT_ENDPOINTS,
  ORDER_ENDPOINTS,
  buildUrl,
  getAuthUrl,
  getCurrencyUrl,
  getProductUrl,
  getOrderUrl,
};
