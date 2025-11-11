/**
 * Helper para gerenciar roles de usuários
 *
 * Estrutura da API:
 * - roles: Array de strings com prefixo "ROLE_"
 * - Exemplo: ["ROLE_CLIENT"], ["ROLE_MANAGER_STORE"], ["ROLE_COMMERCIAL"]
 *
 * Roles no sistema:
 * - ROLE_CLIENT: Usuário normal (área de cliente)
 * - ROLE_COMMERCIAL: Comercial (área administrativa)
 * - ROLE_ADMIN: Administrador (área administrativa)
 * - ROLE_MANAGER: Gerente (área administrativa)
 * - ROLE_MANAGER_STORE: Gerente de Loja (área administrativa)
 */

// Roles que têm acesso à área administrativa (sem o prefixo ROLE_)
const ADMIN_ROLES = [
  'ADMIN',
  'COMMERCIAL',
  'MANAGER',
  'MANAGER_STORE',
  'EMPLOYEE'
];

// Roles de clientes (área de usuário)
const CLIENT_ROLES = ['CLIENT'];

/**
 * Remove o prefixo ROLE_ de uma role
 * @param {string} role - Role com prefixo (ex: "ROLE_CLIENT")
 * @returns {string} Role sem prefixo (ex: "CLIENT")
 */
const removeRolePrefix = (role) => {
  if (!role) return '';
  return role.replace('ROLE_', '').toUpperCase();
};

/**
 * Extrai a primeira role do array de roles do usuário
 * @param {Array|string} roles - Array de roles ou role única
 * @returns {string} Primeira role sem prefixo
 */
const extractRole = (roles) => {
  if (!roles) return '';

  // Se for array, pega o primeiro
  if (Array.isArray(roles)) {
    return roles.length > 0 ? removeRolePrefix(roles[0]) : '';
  }

  // Se for string, retorna diretamente
  return removeRolePrefix(roles);
};

/**
 * Verifica se um usuário é Admin, Comercial, Manager ou Employee
 * @param {Array|string} roles - Array de roles do usuário ou role única
 * @returns {boolean} true se for role administrativa
 */
export const isAdminRole = (roles) => {
  const role = extractRole(roles);
  if (!role) return false;
  return ADMIN_ROLES.includes(role);
};

/**
 * Verifica se um usuário é Cliente
 * @param {Array|string} roles - Array de roles do usuário ou role única
 * @returns {boolean} true se for Cliente
 */
export const isClientRole = (roles) => {
  const role = extractRole(roles);
  if (!role) return false;
  return CLIENT_ROLES.includes(role);
};

/**
 * Retorna o tipo de área que o usuário deve acessar
 * @param {Array|string} roles - Array de roles do usuário ou role única
 * @returns {string} 'admin', 'client' ou 'unknown'
 */
export const getUserAreaType = (roles) => {
  if (isAdminRole(roles)) return 'admin';
  if (isClientRole(roles)) return 'client';
  return 'unknown';
};

/**
 * Verifica se um usuário tem permissão para acessar a área administrativa
 * @param {Object} user - Objeto do usuário com propriedade roles
 * @returns {boolean}
 */
export const canAccessAdminArea = (user) => {
  return user && user.roles && isAdminRole(user.roles);
};

/**
 * Verifica se um usuário tem permissão para acessar a área de cliente
 * @param {Object} user - Objeto do usuário com propriedade roles
 * @returns {boolean}
 */
export const canAccessClientArea = (user) => {
  return user && user.roles && isClientRole(user.roles);
};

/**
 * Retorna uma descrição amigável da role
 * @param {Array|string} roles - Array de roles do usuário ou role única
 * @returns {string} Descrição da role
 */
export const getRoleDescription = (roles) => {
  const role = extractRole(roles);
  if (!role) return 'Desconhecido';

  const descriptions = {
    CLIENT: 'Cliente',
    COMMERCIAL: 'Comercial',
    ADMIN: 'Administrador',
    MANAGER: 'Gerente',
    MANAGER_STORE: 'Gerente de Loja',
    EMPLOYEE: 'Funcionário',
  };

  return descriptions[role] || 'Desconhecido';
};

export default {
  isAdminRole,
  isClientRole,
  getUserAreaType,
  canAccessAdminArea,
  canAccessClientArea,
  getRoleDescription,
};
