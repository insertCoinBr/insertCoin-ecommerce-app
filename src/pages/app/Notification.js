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

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
};

export default function Notification({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Notification');

  // Dados de notificações (normalmente viriam de uma API)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Resident Evil 4 (2005)",
      description: "Novo pacote de skins disponível! Reviva o clássico agora com mapa melhorado!",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      isFavorite: false
    },
    {
      id: 2,
      title: "Dragon Dogma: Deliverance II",
      description: "Expansão anunciada! Prepare-se para novas batalhas épicas no mundo medieval.",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      isFavorite: false
    },
    {
      id: 3,
      title: "Marlyn Potter: Quidditch Chain",
      description: "Evento especial de temporada! Desbloqueie itens únicos e recompensas exclusivas!",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      isFavorite: true
    },
    {
      id: 4,
      title: "EA sports FC 25",
      description: "Nova atualização de temporada disponível! Escale seu time com jogadores atualizados.",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      isFavorite: false
    },
    {
      id: 5,
      title: "Mortal Kombat II Premium Edit",
      description: "Novo lutador na loja! Atualize sua coleção e aproveite o desconto.",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      isFavorite: false
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Notification");
    }, [])
  );

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  const handleToggleFavorite = (id, isFavorite) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isFavorite } : notif
    ));
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
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onToggleFavorite={handleToggleFavorite}
            onShare={handleShare}
            borderType="blue"
            centerColor={COLORS.secondary}
          />
        ))}
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
});