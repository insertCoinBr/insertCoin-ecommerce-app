import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  getStoredToken,
  getStoredUserData,
  setStoredUserData,
  clearAllAuthData,
  getMe,
  loadApiBaseUrl,
  checkTokenExpiry
} from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Dados temporários do fluxo de criação de conta
  const [tempUserData, setTempUserData] = useState({
    email: "",
    name: "",
    password: "",
    isVerified: false,
    verificationType: null, // 'VERIFY_EMAIL' ou 'FORGOT_PASSWORD'
  });

  // Restaurar sessão ao iniciar o app
  useEffect(() => {
    restoreSession();
  }, []);

  // Função para restaurar sessão do AsyncStorage
  const restoreSession = async () => {
    try {
      setIsLoading(true);

      // Carregar URL da API salva (se houver)
      await loadApiBaseUrl();

      // Verificar se o token expirou
      const tokenStatus = await checkTokenExpiry();

      if (tokenStatus.isExpired) {
        // Token expirado, mostrar alerta e limpar dados
        await clearAllAuthData();
        Alert.alert(
          "Sessão Expirada",
          "Sua sessão expirou após 24 horas. Por favor, faça login novamente para continuar.",
          [{ text: "OK" }]
        );
        setIsLoading(false);
        return;
      }

      const storedToken = await getStoredToken();
      const storedUser = await getStoredUserData();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        setIsAuthenticated(true);
      } else if (storedToken) {
        // Tem token mas não tem dados do usuário, buscar da API
        try {
          const userData = await getMe();
          setUser(userData);
          setToken(storedToken);
          setIsAuthenticated(true);
          await setStoredUserData(userData);
        } catch (error) {
          // Token inválido, limpar tudo
          await clearAllAuthData();
        }
      }
    } catch (error) {
      // Erro ao restaurar sessão
    } finally {
      setIsLoading(false);
    }
  };

  // Função para limpar dados temporários
  const clearTempData = () => {
    setTempUserData({
      email: "",
      name: "",
      password: "",
      isVerified: false,
      verificationType: null,
    });
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      console.log('=== LOGOUT FUNCTION CALLED ===');
      await clearAllAuthData();
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      clearTempData();
      console.log('=== LOGOUT: isAuthenticated set to false ===');
    } catch (error) {
      console.log('=== LOGOUT ERROR ===', error);
    }
  };

  // Função para salvar dados do usuário após login
  const saveUserData = async (userData) => {
    setUser(userData);
    await setStoredUserData(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        user,
        setUser,
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        tempUserData,
        setTempUserData,
        clearTempData,
        logout,
        saveUserData,
        restoreSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
