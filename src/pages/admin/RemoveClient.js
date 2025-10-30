import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";

export default function RemoveClient() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [clients, setClients] = useState([
    { id: 1, email: "andersonbohnem@insertcoin.com.br", name: "Anderson Bohnem" },
    { id: 2, email: "luisfelipepagnussat@insertcoin.com.br", name: "Luis Felipe Pagnussat" },
    { id: 3, email: "guilhermeferrari@insertcoin.com.br", name: "Guilherme Ferrari" },
    { id: 4, email: "eduardomorel@insertcoin.com.br", name: "Eduardo Morel" },
    { id: 5, email: "cristianosalles@insertcoin.com.br", name: "Cristiano Salles" },
    { id: 6, email: "carlossantos@insertcoin.com.br", name: "Carlos Santos" },
    { id: 7, email: "lucassilva@insertcoin.com.br", name: "Lucas Silva" },
    { id: 8, email: "pauloalcantra@insertcoin.com.br", name: "Paulo Alcantra" },
    { id: 9, email: "ricardomazda@insertcoin.com.br", name: "Ricardo Mazda" },
    { id: 10, email: "julialima@insertcoin.com.br", name: "Julia Lima" },
  ]);

  const filteredClients = clients.filter(client =>
    client.email.toLowerCase().includes(searchText.toLowerCase()) ||
    client.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setClients(clients.filter(client => client.id !== selectedClient.id));
    setShowModal(false);
    Alert.alert("Success", "Client removed successfully");
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedClient(null);
  };

  return (
    <>
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

        <ScrollView style={styles.list}>
          {filteredClients.map((client) => (
            <TouchableOpacity
              key={client.id}
              style={styles.clientItem}
              onPress={() => handleSelectClient(client)}
            >
              <Text style={styles.clientEmail}>{client.email}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalText}>
              Are you sure you want to remove this client?
            </Text>
            <Text style={styles.modalClient}>{selectedClient?.email}</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelDelete}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  clientEmail: {
    color: "#fff",
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: "#141B3A",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  modalClient: {
    color: "#A855F7",
    fontSize: 14,
    marginBottom: 24,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#EF4444",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});