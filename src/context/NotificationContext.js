import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NOTIFICATIONS_READ_KEY } from '../constants/storageKeys';

export const NotificationsContext = createContext({
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
  deleteNotification: () => {},
  clearAllNotifications: () => {},
  getUnreadNotifications: () => [],
  getFavoriteNotifications: () => [],
  loading: false,
});

//  Notificações Mock (em produção, viriam de uma API)
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Counter-Strike 2",
    description: "Novo pacote de skins disponível! Reviva o clássico agora com mapa melhorado!",
    image: "https://th.bing.com/th/id/OIP.OM-ysScsNzFXF5hIP86F-QHaEK?w=306&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    createdAt: new Date().toISOString(),
    type: "update", // update | promotion | news | system
    isRead: false,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Dota 2",
    description: "Expansão anunciada! Prepare-se para novas batalhas épicas no mundo medieval.",
    image: "https://th.bing.com/th/id/OIP.sfHuAXtzW0kA_Fw8BnoptAHaEo?w=249&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 dia atrás
    type: "news",
    isRead: false,
    isFavorite: false,
  },
  {
    id: 3,
    title: "The Witcher 3: Wild Hunt",
    description: "Evento especial de temporada! Desbloqueie itens únicos e recompensas exclusivas!",
    image: "https://th.bing.com/th?id=OIF.9z1y0larJ9fDTiB%2fpXX%2f5g&w=297&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 dias atrás
    type: "promotion",
    isRead: false,
    isFavorite: true,
  },
  {
    id: 4,
    title: "Grand Theft Auto V",
    description: "Nova atualização de temporada disponível! Escale seu time com jogadores atualizados.",
    image: "https://th.bing.com/th/id/OIP.P7W6XR0rB1MWKWDM6saA2gHaEK?w=292&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 dias atrás
    type: "update",
    isRead: true,
    isFavorite: false,
  },
  {
    id: 5,
    title: "Red Dead Redemption 2",
    description: "Novo lutador na loja! Atualize sua coleção e aproveite o desconto.",
    image: "https://th.bing.com/th/id/OIP.JZktdCpH1WsAZcv-9wAcegHaEK?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 dias atrás
    type: "promotion",
    isRead: true,
    isFavorite: false,
  },
];

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [readNotifications, setReadNotifications] = useState([]);
  const [favoriteNotifications, setFavoriteNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📦 Carrega notificações lidas e favoritas ao iniciar
  useEffect(() => {
    loadNotificationsData();
  }, []);

  // 📦 Carrega dados das notificações do AsyncStorage
  const loadNotificationsData = async () => {
    try {
      setLoading(true);
      const dataJson = await AsyncStorage.getItem(NOTIFICATIONS_READ_KEY);
      if (dataJson) {
        const data = JSON.parse(dataJson);
        setReadNotifications(data.read || []);
        setFavoriteNotifications(data.favorites || []);
        
        // Atualiza o estado das notificações
        const updatedNotifications = MOCK_NOTIFICATIONS.map(notif => ({
          ...notif,
          isRead: data.read?.includes(notif.id) || false,
          isFavorite: data.favorites?.includes(notif.id) || false,
        }));
        setNotifications(updatedNotifications);
        
        console.log(`✅ ${data.read?.length || 0} notificações lidas carregadas`);
        console.log(`❤️ ${data.favorites?.length || 0} notificações favoritadas carregadas`);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar dados das notificações:', error);
    } finally {
      setLoading(false);
    }
  };

  // 💾 Salva dados das notificações no AsyncStorage
  const saveNotificationsData = async (read, favorites) => {
    try {
      const data = {
        read: read,
        favorites: favorites,
      };
      await AsyncStorage.setItem(NOTIFICATIONS_READ_KEY, JSON.stringify(data));
      console.log(`💾 Dados salvos: ${read.length} lidas, ${favorites.length} favoritas`);
    } catch (error) {
      console.error('❌ Erro ao salvar dados das notificações:', error);
      throw error;
    }
  };

  // 📖 Marca notificação como lida
  const markAsRead = async (notificationId) => {
    try {
      if (readNotifications.includes(notificationId)) {
        console.log('⚠️ Notificação já está marcada como lida');
        return false;
      }

      const updatedRead = [...readNotifications, notificationId];
      setReadNotifications(updatedRead);

      // Atualiza o estado das notificações
      const updatedNotifications = notifications.map(notif =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      );
      setNotifications(updatedNotifications);

      await saveNotificationsData(updatedRead, favoriteNotifications);
      console.log(`📖 Notificação ${notificationId} marcada como lida`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao marcar como lida:', error);
      return false;
    }
  };

  // 📖📖 Marca todas as notificações como lidas
  const markAllAsRead = async () => {
    try {
      const allIds = notifications.map(notif => notif.id);
      setReadNotifications(allIds);

      const updatedNotifications = notifications.map(notif => ({
        ...notif,
        isRead: true,
      }));
      setNotifications(updatedNotifications);

      await saveNotificationsData(allIds, favoriteNotifications);
      console.log(`📖📖 Todas as ${allIds.length} notificações marcadas como lidas`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao marcar todas como lidas:', error);
      return false;
    }
  };

  // ❤️ Toggle favorito de notificação
  const toggleFavorite = async (notificationId) => {
    try {
      let updatedFavorites;
      const isFav = favoriteNotifications.includes(notificationId);

      if (isFav) {
        // Remove dos favoritos
        updatedFavorites = favoriteNotifications.filter(id => id !== notificationId);
        console.log(`💔 Notificação ${notificationId} removida dos favoritos`);
      } else {
        // Adiciona aos favoritos
        updatedFavorites = [...favoriteNotifications, notificationId];
        console.log(`❤️ Notificação ${notificationId} adicionada aos favoritos`);
      }

      setFavoriteNotifications(updatedFavorites);

      // Atualiza o estado das notificações
      const updatedNotifications = notifications.map(notif =>
        notif.id === notificationId ? { ...notif, isFavorite: !isFav } : notif
      );
      setNotifications(updatedNotifications);

      await saveNotificationsData(readNotifications, updatedFavorites);
      return true;
    } catch (error) {
      console.error('❌ Erro ao alternar favorito:', error);
      return false;
    }
  };

  // 🔍 Verifica se notificação é favorita
  const isFavorite = (notificationId) => {
    return favoriteNotifications.includes(notificationId);
  };

  // 🗑️ Deleta uma notificação (apenas remove da visualização, não do mock)
  const deleteNotification = async (notificationId) => {
    try {
      // Remove das listas
      const updatedRead = readNotifications.filter(id => id !== notificationId);
      const updatedFavorites = favoriteNotifications.filter(id => id !== notificationId);
      
      setReadNotifications(updatedRead);
      setFavoriteNotifications(updatedFavorites);

      // Remove da lista de notificações
      const updatedNotifications = notifications.filter(notif => notif.id !== notificationId);
      setNotifications(updatedNotifications);

      await saveNotificationsData(updatedRead, updatedFavorites);
      console.log(`🗑️ Notificação ${notificationId} deletada`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao deletar notificação:', error);
      return false;
    }
  };

  // 🧹 Limpa todas as notificações
  const clearAllNotifications = async () => {
    try {
      setNotifications([]);
      setReadNotifications([]);
      setFavoriteNotifications([]);
      await AsyncStorage.removeItem(NOTIFICATIONS_READ_KEY);
      console.log('🧹 Todas as notificações foram removidas');
      return true;
    } catch (error) {
      console.error('❌ Erro ao limpar notificações:', error);
      return false;
    }
  };

  // 🔢 Conta notificações não lidas
  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  // 📋 Obtém apenas notificações não lidas
  const getUnreadNotifications = () => {
    return notifications.filter(notif => !notif.isRead);
  };

  // ❤️ Obtém apenas notificações favoritas
  const getFavoriteNotifications = () => {
    return notifications.filter(notif => notif.isFavorite);
  };

  // 📊 Ordena notificações por data (mais recentes primeiro)
  const getNotificationsSortedByDate = () => {
    return [...notifications].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  };

  // 🏷️ Filtra notificações por tipo
  const getNotificationsByType = (type) => {
    if (!type) return notifications;
    return notifications.filter(notif => notif.type === type);
  };

  // 🔍 Busca notificações por texto
  const searchNotifications = (searchTerm) => {
    if (!searchTerm) return notifications;
    const term = searchTerm.toLowerCase();
    return notifications.filter(notif =>
      notif.title.toLowerCase().includes(term) ||
      notif.description.toLowerCase().includes(term)
    );
  };

  // 📅 Obtém notificações de hoje
  const getTodayNotifications = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return notifications.filter(notif => {
      const notifDate = new Date(notif.createdAt);
      notifDate.setHours(0, 0, 0, 0);
      return notifDate.getTime() === today.getTime();
    });
  };

  // 📅 Obtém notificações desta semana
  const getWeekNotifications = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return notifications.filter(notif => {
      const notifDate = new Date(notif.createdAt);
      return notifDate >= weekAgo;
    });
  };

  // 🎨 Obtém cor do badge baseado no tipo
  const getNotificationTypeColor = (type) => {
    const colors = {
      update: '#4CAF50',      // Verde
      promotion: '#FF9800',   // Laranja
      news: '#2196F3',        // Azul
      system: '#9E9E9E',      // Cinza
    };
    return colors[type] || colors.system;
  };

  // 📝 Obtém texto do tipo de notificação
  const getNotificationTypeLabel = (type) => {
    const labels = {
      update: 'Atualização',
      promotion: 'Promoção',
      news: 'Novidade',
      system: 'Sistema',
    };
    return labels[type] || 'Notificação';
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        toggleFavorite,
        isFavorite,
        deleteNotification,
        clearAllNotifications,
        getUnreadNotifications,
        getFavoriteNotifications,
        getNotificationsSortedByDate,
        getNotificationsByType,
        searchNotifications,
        getTodayNotifications,
        getWeekNotifications,
        getNotificationTypeColor,
        getNotificationTypeLabel,
        loading,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}