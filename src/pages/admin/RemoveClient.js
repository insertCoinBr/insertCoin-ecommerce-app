import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import CustomAlert from "../../components/admin/CustomAlert";
import ConfirmModal from "../../components/admin/ConfirmModal";

export default function RemoveClient() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [clients, setClients] = useState([
    { id: 1, email: "andersonbohnem@insertcoin.com.br", name: "Anderson Bohnem", isActive: true },
    { id: 2, email: "luisfelipepagnussat@insertcoin.com.br", name: "Luis Felipe Pagnussat", isActive: true },
    { id: 3, email: "guilhermeferrari@insertcoin.com.br", name: "Guilherme Ferrari", isActive: true },
    { id: 4, email: "eduardomorel@insertcoin.com.br", name: "Eduardo Morel", isActive: true },
    { id: 5, email: "cristianosalles@insertcoin.com.br", name: "Cristiano Salles", isActive: true },
    { id: 6, email: "carlossantos@insertcoin.com.br", name: "Carlos Santos", isActive: true },
    { id: 7, email: "lucassilva@insertcoin.com.br", name: "Lucas Silva", isActive: true },
    { id: 8, email: "pauloalcantra@insertcoin.com.br", name: "Paulo Alcantra", isActive: true },
    { id: 9, email: "ricardomazda@insertcoin.com.br", name: "Ricardo Mazda", isActive: true },
    { id: 10, email: "julialima@insertcoin.com.br", name: "Julia Lima", isActive: true },
  ]);

  const filteredClients = clients.filter(client =>
    client.isActive && (
      client.email.toLowerCase().includes(searchText.toLowerCase()) ||
      client.name.toLowerCase().includes(searchText.toLowerCase())
    )
  );

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

  const handleConfirmInactivate = () => {
    if (selectedClient?.count) {
      // Inactivate multiple
      setClients(clients.map(client =>
        selectedItems.includes(client.id)
          ? { ...client, isActive: false }
          : client
      ));
      setSelectedItems([]);
    } else {
      // Inactivate single
      setClients(clients.map(client =>
        client.id === selectedClient.id
          ? { ...client, isActive: false }
          : client
      ));
    }
    setShowModal(false);
    setShowAlert(true);
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
        type="success"
        message="Client inactivated successfully"
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
});