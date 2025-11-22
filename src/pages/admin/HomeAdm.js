import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { getMe } from '../../services/authService';
import { filterMenuByPermissions } from '../../utils/permissionHelper';
import HomeAdminHeader from "../../components/admin/HomeAdminHeader";
import ExpandableMenuItem from "../../components/admin/ExpandableMenuItem";

export default function HomeAdm({ route, onLogout }) {
  const { user, saveUserData } = useContext(AuthContext);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const menuItems = [
    {
      title: "Employees",
      options: [
        { title: "Add Employee", route: "AddEmployee" },
        { title: "Remove Employee", route: "RemoveEmployee" },
        { title: "View & Edit Employee", route: "EditEmployee" },
      ],
    },
    {
      title: "Orders",
      options: [
        { title: "View & Cancel Order", route: "Order" },
      ],
    },
    {
      title: "Clients",
      options: [
        { title: "Inative Client", route: "RemoveClient" },
        { title: "View & Edit Client", route: "ViewEditClient" },
      ],
    },
    {
      title: "Products",
      options: [
        { title: "Add Product", route: "AddProduct" },
        { title: "Remove Product", route: "RemoveProduct" },
        { title: "View & Edit Product", route: "ViewEditProduct" },
      ],
    },
    {
      title: "Notifications",
      options: [
        { title: "Add Notification", route: "AddNotification" },
        { title: "Remove Notification", route: "RemoveNotification" },
        { title: "View & Edit Notification", route: "ViewEditNotification" },
      ],
    },
  ];

  // Carregar dados do usuário e filtrar menu baseado em permissões
  useEffect(() => {
    const loadUserAndMenu = async () => {
      try {
        setLoading(true);

        // Se não tiver dados do usuário no contexto, buscar da API
        let userData = user;
        if (!userData) {
          userData = await getMe();
          await saveUserData(userData);
        }

        // Filtrar menu baseado nas permissões do usuário
        if (userData && userData.roles) {
          const filtered = filterMenuByPermissions(menuItems, userData.roles);
          setFilteredMenu(filtered);
        } else {
          // Se não tiver roles, não mostra nada
          setFilteredMenu([]);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // Em caso de erro, não mostra menu
        setFilteredMenu([]);
      } finally {
        setLoading(false);
      }
    };

    loadUserAndMenu();
  }, [user]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <HomeAdminHeader onLogout={onLogout} />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#A855F7" />
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            {filteredMenu.map((item, index) => (
              <ExpandableMenuItem
                key={index}
                title={item.title}
                options={item.options}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0F24",
  },
  container: {
    flex: 1,
    backgroundColor: "#0A0F24",
    paddingHorizontal: 20,
  },
  scrollView: {
    marginTop: 30,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});