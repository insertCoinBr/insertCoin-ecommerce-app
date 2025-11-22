/**
 * Helper para gerenciar permissões de admin baseado em roles
 *
 * Cada role tem diferentes permissões para acessar funcionalidades do sistema
 */

// Mapeamento de permissões por role
const ROLE_PERMISSIONS = {
  MANAGER_STORE: {
    employees: true,
    orders: true,
    clients: true,
    products: true,
    promotions: true,
    notifications: true,
  },
  COMMERCIAL: {
    employees: false,
    orders: true,
    clients: true,
    products: true,
    promotions: true,
    notifications: true,
  },

};

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
 * Obtém as permissões de um usuário baseado em suas roles
 * @param {Array|string} roles - Array de roles do usuário ou role única
 * @returns {Object} Objeto com permissões
 */
export const getUserPermissions = (roles) => {
  const role = extractRole(roles);

  // Se não tem role ou role não mapeada, retorna permissões vazias
  if (!role || !ROLE_PERMISSIONS[role]) {
    return {
      employees: false,
      orders: false,
      clients: false,
      products: false,
      promotions: false,
      notifications: false,
    };
  }

  return ROLE_PERMISSIONS[role];
};

/**
 * Verifica se o usuário tem permissão específica
 * @param {Array|string} roles - Array de roles do usuário ou role única
 * @param {string} permission - Nome da permissão (ex: 'employees', 'orders')
 * @returns {boolean}
 */
export const hasPermission = (roles, permission) => {
  const permissions = getUserPermissions(roles);
  return permissions[permission] === true;
};

/**
 * Filtra itens de menu baseado nas permissões do usuário
 * @param {Array} menuItems - Array de itens do menu
 * @param {Array|string} roles - Array de roles do usuário ou role única
 * @returns {Array} Menu filtrado
 */
export const filterMenuByPermissions = (menuItems, roles) => {
  const permissions = getUserPermissions(roles);

  return menuItems.filter(item => {
    // Mapeia o título do menu para a permissão correspondente
    const permissionKey = item.title.toLowerCase().replace(/s$/, ''); // Remove 's' no final

    // Mapeamento especial para casos que não seguem o padrão
    const permissionMap = {
      'employee': 'employees',
      'order': 'orders',
      'client': 'clients',
      'product': 'products',
      'promotion': 'promotions',
      'notification': 'notifications',
    };

    const permission = permissionMap[permissionKey] || permissionKey;

    return permissions[permission] === true;
  });
};

/**
 * Obtém descrição das permissões de uma role
 * @param {Array|string} roles - Array de roles do usuário ou role única
 * @returns {string} Descrição das permissões
 */
export const getPermissionsDescription = (roles) => {
  const permissions = getUserPermissions(roles);
  const allowed = Object.keys(permissions).filter(key => permissions[key]);

  if (allowed.length === 0) {
    return 'Nenhuma permissão administrativa';
  }

  const descriptions = {
    employees: 'Funcionários',
    orders: 'Pedidos',
    clients: 'Clientes',
    products: 'Produtos',
    promotions: 'Promoções',
    notifications: 'Notificações',
  };

  return allowed.map(key => descriptions[key]).join(', ');
};

export default {
  getUserPermissions,
  hasPermission,
  filterMenuByPermissions,
  getPermissionsDescription,
};
