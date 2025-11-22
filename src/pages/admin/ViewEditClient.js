import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import { searchClients, getUserById } from "../../services/authService";

export default function ViewEditClient() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Carregar clients da API
  useEffect(() => {
    loadClients();
  }, [page]);

  const loadClients = async () => {
    try {
      setLoading(true);
      const response = await searchClients({
        email: searchText,
        page: page,
        size: 20
      });

      // A resposta pode vir em formato paginado
      let clientList = [];
      if (response.content) {
        clientList = response.content;
        setTotalPages(response.totalPages || 0);
      } else if (Array.isArray(response)) {
        clientList = response;
      }

      // Buscar detalhes completos de cada client (incluindo campo active)
      if (clientList.length > 0) {
        const detailedClients = await Promise.all(
          clientList.map(async (client) => {
            try {
              const fullData = await getUserById(client.id);
              return fullData;
            } catch (error) {
              console.error('Erro ao buscar detalhes do client:', client.id, error);
              return client;
            }
          })
        );
        setClients(detailedClients);
      } else {
        setClients([]);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Recarregar quando buscar
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadClients();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  // Mostrar todos os clients (ativos e inativos)

  const handleSelectClient = async (client) => {
    try {
      setLoading(true);
      // Buscar dados completos do client antes de editar
      const fullClientData = await getUserById(client.id);
      navigation.navigate("EditClientForm", { client: fullClientData });
    } catch (error) {
      console.error('Error loading client details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="#A855F7" />
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Image source={require("../../../assets/LogoInsetCoin1.png")} style={styles.logo} />
          <Text style={styles.headerTitle}>InsertCoin</Text>
        </View>
      </View>

      <Text style={styles.title}>Clients</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#ccc" />
        <TextInput
          placeholder="Type to search"
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A855F7" />
        </View>
      ) : (
        <ScrollView style={styles.list}>
          {clients.map((client) => (
            <TouchableOpacity
              key={client.id}
              style={styles.clientItem}
              onPress={() => handleSelectClient(client)}
            >
              <View style={styles.clientInfo}>
                <Text style={styles.clientEmail}>{client.email}</Text>
                {client.active === false && (
                  <View style={styles.inactiveBadge}>
                    <Text style={styles.inactiveBadgeText}>Inactive</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
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
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#ffffffff",
    fontSize: 16,
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  title: {
    color: "#ffffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141B3A",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },
  list: {
    flex: 1,
  },
  clientItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1B254F",
  },
  clientInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  clientEmail: {
    color: "#fff",
    fontSize: 15,
    flex: 1,
  },
  inactiveBadge: {
    backgroundColor: "#6B7280",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inactiveBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});