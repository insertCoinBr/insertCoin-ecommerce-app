import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import AdmStack from "./AdmStack";

//  IMPORTAR OS PROVIDERS
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { AuthContext } from "../context/AuthContext";
import { isAdminRole } from "../utils/roleHelper";

export default function Routes() {
  const { isAuthenticated, isLoading, user, logout } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  // Verificar se já está autenticado via AsyncStorage
  React.useEffect(() => {
    if (isAuthenticated && user) {
      // Usa o helper para verificar se é role administrativa
      // ROLE_ADMIN, ROLE_COMMERCIAL, ROLE_MANAGER_STORE vão para área administrativa
      // ROLE_CLIENT vai para área de usuário
      if (isAdminRole(user.roles)) {
        setIsAdmin(true);
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setIsAdmin(false);
      }
    }
  }, [isAuthenticated, user]);

  // Função de logout que limpa tudo
  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  // Mostra loading enquanto verifica a sessão
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1F41BB" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/*ENVOLVER TUDO COM OS PROVIDERS */}
      <CartProvider>
        <FavoritesProvider>
          {isLoggedIn ? (
            <AppStack onLogout={handleLogout} />
          ) : isAdmin ? (
            <AdmStack onLogout={handleLogout} />
          ) : (
            <AuthStack
              onLogin={() => setIsLoggedIn(true)}
              onAdminLogin={() => setIsAdmin(true)}
            />
          )}
        </FavoritesProvider>
      </CartProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});