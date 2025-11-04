import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@notifications';

export const NotificationStorage = {
  // Buscar todas as notificações
  async getAll() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting notifications:', error);
      return [];
    }
  },

  // Salvar notificação
  async save(notification) {
    try {
      const notifications = await this.getAll();
      const newNotification = {
        ...notification,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      notifications.push(newNotification);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
      return newNotification;
    } catch (error) {
      console.error('Error saving notification:', error);
      throw error;
    }
  },

  // Atualizar notificação
  async update(id, updatedNotification) {
    try {
      const notifications = await this.getAll();
      const index = notifications.findIndex(n => n.id === id);
      if (index !== -1) {
        notifications[index] = { ...notifications[index], ...updatedNotification };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
        return notifications[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error;
    }
  },

  // Deletar notificação
  async delete(id) {
    try {
      const notifications = await this.getAll();
      const filtered = notifications.filter(n => n.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  // Limpar todas
  async clear() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  }
};