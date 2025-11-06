/**
 * Chaves de armazenamento do AsyncStorage
 * Centralizadas para evitar duplicação e erros de digitação
 */

//  Carrinho de Compras
export const CART_STORAGE_KEY = '@insertcoin:cart';

//  Favoritos / Lista de Desejos
export const FAVORITES_STORAGE_KEY = '@insertcoin:favorites';

//  Cupons Aplicados
export const COUPONS_STORAGE_KEY = '@insertcoin:coupons';

//  Moeda Selecionada
export const CURRENCY_STORAGE_KEY = '@currency';

//  Dados do Usuário
export const USER_DATA_KEY = '@insertcoin:user';

//  Token de Autenticação
export const AUTH_TOKEN_KEY = '@insertcoin:auth_token';

//  Pedidos
export const ORDERS_STORAGE_KEY = '@insertcoin:orders';

//  Configurações do App
export const APP_SETTINGS_KEY = '@insertcoin:settings';

//  Notificações Lidas
export const NOTIFICATIONS_READ_KEY = '@insertcoin:notifications_read';

/**
 * Função auxiliar para limpar todo o armazenamento
 * Útil para logout ou reset do app
 */
export const CLEAR_ALL_KEYS = [
  CART_STORAGE_KEY,
  FAVORITES_STORAGE_KEY,
  COUPONS_STORAGE_KEY,
  ORDERS_STORAGE_KEY,
  USER_DATA_KEY,
  AUTH_TOKEN_KEY,
];

/**
 * Função auxiliar para limpar apenas dados de sessão
 * Mantém configurações do app
 */
export const CLEAR_SESSION_KEYS = [
  CART_STORAGE_KEY,
  COUPONS_STORAGE_KEY,
  AUTH_TOKEN_KEY,
];