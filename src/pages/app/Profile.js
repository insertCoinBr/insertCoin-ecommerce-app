import React, { useState, useCallback, useContext } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

//IMPORTAR O FAVORITESCONTEXT
import { FavoritesContext } from "../../context/FavoritesContext";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import ProfileHeader from "../../components/app/ProfileHeader";
import MenuButton from "../../components/app/MenuButton";
import CurrencyToggle from "../../components/app/CurrencyToggle";
import SectionTitle from "../../components/app/SectionTitle";
import ConfirmModal from '../../components/app/ConfirmModal';

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
  red: "#ff4444",
};

export default function Profile({ navigation, onLogout }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Notification');
  const [currency, setCurrency] = useState('BRL');
  
  // Estados dos modais
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleLogout, setModalVisibleLogout] = useState(false);

  //USAR O FAVORITESCONTEXT
  const { getFavoritesCount } = useContext(FavoritesContext);
  
  // Dados do usuário (normalmente viriam de um contexto/API)
  const [userData, setUserData] = useState({
    name: "Tio do Claudio",
    email: "email@email.com",
    avatar: null,
    coins: 150,
  });

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Notification");
    }, [])
  );

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  const handleDelete = () => {
    setModalVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleLogout = () => {
    setModalVisibleLogout(false);
    if (onLogout) {
      onLogout();
    }
  };

  if (!fontLoaded) {
    return null;
  }

  //  QUANTIDADE DE FAVORITOS
  const favoritesCount = getFavoritesCount();

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Perfil" 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com Avatar e Informações */}
        <ProfileHeader
          userName={userData.name}
          userEmail={userData.email}
          userAvatar={userData.avatar}
          coins={userData.coins}
          borderType="blue"
          centerColor={COLORS.secondary}
        />

        {/* Seção Conta */}
        <SectionTitle style={styles.sectionTitle}>Conta</SectionTitle>
        <MenuButton
          title="Dados pessoais"
          img={require("../../../assets/IconsPixel/iconEdirUser.png")}
          onPress={() => navigation.navigate('PersonalData')}
          borderType="blue"
          centerColor={COLORS.secondary}
        />
        <MenuButton
          title="Trocar senha"
          img={require("../../../assets/IconsPixel/iconPasswordChange.png")}
          onPress={() => navigation.navigate('ChangePassword')}
          borderType="blue"
          centerColor={COLORS.secondary}
        />
        <MenuButton
          title="Excluir Conta"
          img={require("../../../assets/IconsPixel/iconExitUserWhite.png")}
          onPress={() => setModalVisible(true)}
          borderType="blue"
          centerColor={COLORS.secondary}
        />

        {/* Modal de Confirmação - Excluir Conta */}
        <ConfirmModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleDelete}
          title="Excluir Conta"
          message="Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
          confirmText="Excluir"
          cancelText="Cancelar"
          borderTypeButton1="blue"
          centerColorButton1={COLORS.secondary}
          borderTypeButton2="red"
          centerColorButton2={COLORS.red}
        />

        {/* Seção Moeda */}
        <SectionTitle style={styles.sectionTitle}>Moeda</SectionTitle>
        <CurrencyToggle
          currency={currency}
          onToggle={setCurrency}
          borderType="blue"
          centerColor={COLORS.secondary}
        />

        {/* Seção Favoritos -  COM CONTADOR */}
        <SectionTitle style={styles.sectionTitle}>
          Favoritos {favoritesCount > 0 && `(${favoritesCount})`}
        </SectionTitle>
        <MenuButton
          title={`Lista de Desejos${favoritesCount > 0 ? ` · ${favoritesCount}` : ''}`}
          img={require("../../../assets/IconsPixel/iconHeartNull.png")}
          onPress={() => navigation.navigate('Wishlist')}
          borderType="blue"
          centerColor={COLORS.secondary}
        />

        {/* Seção Informações */}
        <SectionTitle style={styles.sectionTitle}>Informações</SectionTitle>
        <MenuButton
          title="Termos de Uso"
          img={require("../../../assets/IconsPixel/iconTermsWhite.png")}
          onPress={() => navigation.navigate('TermsOfUse')}
          borderType="blue"
          centerColor={COLORS.secondary}
        />
        <MenuButton
          title="Perguntas Frequentes"
          img={require("../../../assets/IconsPixel/iconFAQ.png")}
          onPress={() => navigation.navigate('FrequencyQuestions')}
          borderType="blue"
          centerColor={COLORS.secondary}
        />
        <MenuButton
          title="Créditos"
          img={require("../../../assets/IconsPixel/iconCredits.png")}
          onPress={() => navigation.navigate('ListIntegrantes')}
          borderType="blue"
          centerColor={COLORS.secondary}
        />

        {/* Seção Sessão */}
        <SectionTitle style={styles.sectionTitle}>Sessão</SectionTitle>
        <MenuButton
          title="Sair" 
          img={require("../../../assets/IconsPixel/iconExitWhite.png")}
          onPress={() => setModalVisibleLogout(true)}
          borderType="red"
          centerColor={COLORS.red}
        />

        {/* Modal de Confirmação - Sair */}
        <ConfirmModal
          visible={modalVisibleLogout}
          onClose={() => setModalVisibleLogout(false)}
          onConfirm={handleLogout}
          title="Sair"
          message="Tem certeza que deseja sair da sua conta?"
          confirmText="Sair"
          cancelText="Cancelar"
          borderTypeButton1="blue"
          centerColorButton1={COLORS.secondary}
          borderTypeButton2="red"
          centerColorButton2={COLORS.red}
        />
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
    paddingBottom: 160,
    paddingTop: 8,
  },
  sectionTitle: {
    paddingTop: 10,
  },
});