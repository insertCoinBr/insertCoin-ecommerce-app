import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import CustomAlert from "../../components/admin/CustomAlert";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { searchClients, getUserById, updateClient } from "../../services/authService";

export default function RemoveClient() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });
  const [selectedItems, setSelectedItems] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
      setAlertConfig({
        type: 'error',
        message: error.message || 'Failed to load clients'
      });
      setShowAlert(true);
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

  // Filtrar apenas clients ativos
  const filteredClients = clients.filter(client => {
    const isActive = client.active !== false && client.active !== "false" && client.active !== 0;
    return isActive;
  });

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredClients.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredClients.map(item => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      return;
    }
    setShowModal(true);
    setSelectedClient({ count: selectedItems.length });
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleConfirmInactivate = async () => {
    try {
      setDeleting(true);
      setShowModal(false);

      if (selectedClient?.count) {
        // Inativar múltiplos
        const promises = selectedItems.map(id => {
          return updateClient(id, { active: false });
        });
        await Promise.all(promises);

        // Remover imediatamente da lista local para feedback instantâneo
        setClients(prev => prev.filter(client => !selectedItems.includes(client.id)));
        setAlertConfig({ type: 'success', message: `${selectedItems.length} client(s) inactivated successfully` });
        setSelectedItems([]);
      } else {
        // Inativar único
        await updateClient(selectedClient.id, { active: false });

        // Remover imediatamente da lista local para feedback instantâneo
        setClients(prev => prev.filter(client => client.id !== selectedClient.id));
        setAlertConfig({ type: 'success', message: 'Client inactivated successfully' });
      }

      setShowAlert(true);

      // Recarregar lista do servidor em background
      loadClients();
    } catch (error) {
      console.error('Error inactivating client:', error);
      setAlertConfig({
        type: 'error',
        message: error.message || 'Failed to inactivate client'
      });
      setShowAlert(true);

      // Em caso de erro, recarregar para garantir consistência
      loadClients();
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelInactivate = () => {
    setShowModal(false);
    setSelectedClient(null);
  };

  return (
    <>
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

        {selectedItems.length > 0 && (
          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.selectAllButton} onPress={toggleSelectAll}>
              <Ionicons
                name={selectedItems.length === filteredClients.length ? "checkbox" : "square-outline"}
                size={20}
                color="#A855F7"
              />
              <Text style={styles.selectAllText}>
                {selectedItems.length === filteredClients.length ? 'Deselect All' : 'Select All'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inactivateButton} onPress={handleDeleteSelected}>
              <Ionicons name="ban" size={20} color="#fff" />
              <Text style={styles.deleteButtonText}>Inactivate ({selectedItems.length})</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#A855F7" />
          </View>
        ) : (
          <ScrollView style={styles.list}>
            {filteredClients.map((client) => (
              <TouchableOpacity
                key={client.id}
                style={styles.itemCard}
                onPress={() => toggleItemSelection(client.id)}
              >
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => toggleItemSelection(client.id)}
                >
                  <Ionicons
                    name={selectedItems.includes(client.id) ? "checkbox" : "square-outline"}
                    size={24}
                    color="#A855F7"
                  />
                </TouchableOpacity>

                <View style={styles.itemInfo}>
                  <Text style={styles.clientEmail}>{client.email}</Text>
                  <Text style={styles.clientName}>{client.name}</Text>
                </View>

                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    handleSelectClient(client);
                  }}
                >
                  <Ionicons name="ban-outline" size={20} color="#F59E0B" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        </View>
      </SafeAreaView>

      <ConfirmModal
        visible={showModal}
        title="Confirm Inactivation"
        message={
          selectedClient?.count
            ? `Are you sure you want to inactivate ${selectedClient.count} clients?`
            : "Are you sure you want to inactivate this client?"
        }
        highlightText={selectedClient?.count ? null : selectedClient?.email}
        confirmText="Inactivate"
        confirmColor="#F59E0B"
        onConfirm={handleConfirmInactivate}
        onCancel={handleCancelInactivate}
      />

      <CustomAlert
        visible={showAlert}
        type={alertConfig.type}
        message={alertConfig.message}
        onClose={() => setShowAlert(false)}
      />
    </>
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
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  selectAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectAllText: {
    color: "#A855F7",
    fontSize: 14,
    fontWeight: "600",
  },
  inactivateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F59E0B",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D1429",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    gap: 12,
  },
  checkboxContainer: {
    padding: 5,
  },
  itemInfo: {
    flex: 1,
  },
  clientItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1B254F",
  },
  clientEmail: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  clientName: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4,
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