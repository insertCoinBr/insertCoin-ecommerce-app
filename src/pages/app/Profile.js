import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//IMPORTAR OS CONTEXTS
import { FavoritesContext } from "../../context/FavoritesContext";
import { AuthContext } from "../../context/AuthContext";

// SERVICES
import { updateMe } from "../../services/authService";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
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
  const [currency, setCurrency] = useState('BRL');

  // Estados dos modais
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleLogout, setModalVisibleLogout] = useState(false);

  //USAR OS CONTEXTS
  const { getFavoritesCount } = useContext(FavoritesContext);
  const { user, logout } = useContext(AuthContext);

  // Estados de loading
  const [isDeleting, setIsDeleting] = useState(false);

  // Dados do usuário vindos da API /auth/me
  const userData = {
    name: user?.name || "Usuário",
    email: user?.email || "email@email.com",
    avatar: null,
    coins: user?.point || 0, // A API retorna "point" não "coins"
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Chamar API para desativar conta (active: false)
      await updateMe({ active: false });

      // Fechar modal
      setModalVisible(false);

      // Fazer logout após desativar conta
      await logout();
    } catch (error) {
      // console.log('Erro ao excluir conta:', error);
      setModalVisible(false);
      // Mesmo em caso de erro, fazer logout
      await logout();
    } finally {
      setIsDeleting(false);
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
          onClose={() => !isDeleting && setModalVisible(false)}
          onConfirm={handleDelete}
          title="Excluir Conta"
          message="Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
          confirmText={isDeleting ? "Excluindo..." : "Excluir"}
          cancelText="Cancelar"
          borderTypeButton1="blue"
          centerColorButton1={COLORS.secondary}
          borderTypeButton2="red"
          centerColorButton2={COLORS.red}
          disabled={isDeleting}
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