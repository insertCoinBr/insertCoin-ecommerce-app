import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Text, Share  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import NotificationCard from "../../components/app/NotificationCard";

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

// SERVIÇO DE STORAGE
import { NotificationStorage } from "../../services/NotificationStorage";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
};

export default function Notification({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Notification');
  const [notifications, setNotifications] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Notification");
      loadNotifications();
    }, [])
  );

  const loadNotifications = async () => {
    try {
      const storedNotifications = await NotificationStorage.getAll();
      setNotifications(storedNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  const handleToggleFavorite = async (id, isFavorite) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isFavorite } : notif
    ));
    
    // Atualizar no storage
    try {
      await NotificationStorage.update(id, { isFavorite });
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleShare = async (notification) => {
    try {
      const message = `${notification.title}\n\n${notification.description}`;
      const result = await Share.share({ message });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Compartilhado com: ${result.activityType} — id=${notification.id} title="${notification.title}"`);
        } else {
          console.log(`Compartilhado com sucesso — id=${notification.id} title="${notification.title}"`);
        }
      } else if (result.action === Share.dismissedAction) {
        console.log(`Compartilhamento cancelado — id=${notification.id} title="${notification.title}"`);
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Notificação" 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhuma notificação disponível</Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onToggleFavorite={handleToggleFavorite}
              onShare={handleShare}
              borderType="blue"
              centerColor={COLORS.secondary}
            />
          ))
        )}
      </ScrollView>

      <BottomTabBar 
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 120,
    paddingTop: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
});