import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URLS } from '../config/apiConfig';

// Configuração da API (pode ser alterada dinamicamente)
let API_BASE_URL = API_URLS.GATEWAY;

// Função para atualizar a URL base da API
export const setApiBaseUrl = (newUrl) => {
  API_BASE_URL = newUrl;
  api.defaults.baseURL = newUrl;
};

// Função para obter a URL base atual
export const getApiBaseUrl = () => {
  return API_BASE_URL;
};

// Chaves para AsyncStorage
const STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  API_BASE_URL: '@api_base_url', // Persistir URL configurada
  TOKEN_EXPIRY: '@token_expiry', // Data de expiração do token
};

// Duração do token em milissegundos (24 horas)
const TOKEN_DURATION = 24 * 60 * 60 * 1000;

// Criar instância do axios com configuração base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  async (config) => {
    const token = await getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funções auxiliares para gerenciar token com AsyncStorage
export const setStoredToken = async (token) => {
  try {
    const expiryDate = new Date().getTime() + TOKEN_DURATION;
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.TOKEN, token],
      [STORAGE_KEYS.TOKEN_EXPIRY, expiryDate.toString()]
    ]);
  } catch (error) {
    console.error('Erro ao salvar token:', error);
  }
};

export const getStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    const expiry = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);

    // Verificar se o token existe
    if (!token) {
      return null;
    }

    // Verificar se o token expirou
    if (expiry) {
      const expiryTime = parseInt(expiry, 10);
      const currentTime = new Date().getTime();

      if (currentTime > expiryTime) {
        // Token expirado, limpar dados
        await clearAllAuthData();
        return null;
      }
    }

    return token;
  } catch (error) {
    console.error('Erro ao buscar token:', error);
    return null;
  }
};

// Verificar se o token expirou (retorna objeto com informações detalhadas)
export const checkTokenExpiry = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    const expiry = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);

    if (!token) {
      return { isValid: false, isExpired: false, token: null };
    }

    if (expiry) {
      const expiryTime = parseInt(expiry, 10);
      const currentTime = new Date().getTime();

      if (currentTime > expiryTime) {
        return { isValid: false, isExpired: true, token };
      }
    }

    return { isValid: true, isExpired: false, token };
  } catch (error) {
    console.error('Erro ao verificar expiração do token:', error);
    return { isValid: false, isExpired: false, token: null };
  }
};

export const clearStoredToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
  } catch (error) {
    console.error('Erro ao limpar token:', error);
  }
};

// Funções auxiliares para gerenciar dados do usuário
export const setStoredUserData = async (userData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
  }
};

export const getStoredUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    return null;
  }
};

export const clearStoredUserData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
  } catch (error) {
    console.error('Erro ao limpar dados do usuário:', error);
  }
};

// Limpar todos os dados de autenticação
export const clearAllAuthData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.TOKEN_EXPIRY
    ]);
  } catch (error) {
    console.error('Erro ao limpar dados de autenticação:', error);
  }
};

// Funções para gerenciar URL da API no AsyncStorage
export const saveApiBaseUrl = async (url) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.API_BASE_URL, url);
    setApiBaseUrl(url);
  } catch (error) {
    console.error('Erro ao salvar URL da API:', error);
  }
};

export const loadApiBaseUrl = async () => {
  try {
    const savedUrl = await AsyncStorage.getItem(STORAGE_KEYS.API_BASE_URL);
    if (savedUrl) {
      setApiBaseUrl(savedUrl);
      return savedUrl;
    }
    return API_BASE_URL;
  } catch (error) {
    console.error('Erro ao carregar URL da API:', error);
    return API_BASE_URL;
  }
};

/**
 * POST /auth/verify-email
 * Envia o email para verificação
 * @param {string} email - Email do usuário
 * @returns {Promise} Resposta da API
 */
export const verifyEmail = async (email) => {
  try {
    const response = await api.post('/auth/verify-email', { email });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * POST /auth/validate-code
 * Valida o código enviado por email
 * @param {string} email - Email do usuário
 * @param {string} code - Código de verificação
 * @param {string} type - Tipo de validação: "VERIFY_EMAIL" ou "FORGOT_PASSWORD"
 * @returns {Promise} Resposta da API
 */
export const validateCode = async (email, code, type = 'VERIFY_EMAIL') => {
  try {
    const response = await api.post('/auth/validate-code', { email, code, type });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * POST /auth/signup
 * Cria um novo usuário
 * @param {Object} userData - Dados do usuário
 * @param {string} userData.name - Nome do usuário
 * @param {string} userData.email - Email do usuário
 * @param {string} userData.password - Senha do usuário
 * @returns {Promise} Resposta da API
 */
export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * POST /auth/signin
 * Realiza o login do usuário (Client ou Admin)
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise} Resposta da API com access_token
 */
export const signin = async (email, password) => {
  try {
    const response = await api.post('/auth/signin', { email, password });
    if (response.data.access_token) {
      await setStoredToken(response.data.access_token);
    }
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * POST /auth/reset-password
 * Atualiza a senha se o usuário foi verificado
 * @param {string} email - Email do usuário
 * @param {string} newPassword - Nova senha
 * @returns {Promise} Resposta da API
 */
export const resetPassword = async (email, newPassword) => {
  try {
    const response = await api.post('/auth/reset-password', {
      email,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * POST /auth/forgot-password
 * Envia email para recuperação de senha
 * @param {string} email - Email do usuário
 * @returns {Promise} Resposta da API
 */
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * GET /auth/me
 * Obtém dados do usuário com base no token
 * @returns {Promise} Dados do usuário (ADM ou Client)
 */
export const getMe = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Função auxiliar para tratar erros da API
 * @param {Error} error - Erro retornado pela API
 * @returns {Error} Erro formatado
 */
const handleApiError = (error) => {
  if (error.response) {
    // O servidor respondeu com um status de erro
    const message = error.response.data?.message || error.response.data?.error || 'Erro ao processar requisição';
    const statusCode = error.response.status;

    const customError = new Error(message);
    customError.statusCode = statusCode;
    customError.data = error.response.data;

    return customError;
  } else if (error.request) {
    // A requisição foi feita mas não houve resposta
    return new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
  } else {
    // Algo aconteceu ao configurar a requisição
    return new Error(error.message || 'Erro desconhecido');
  }
};

export default api;
