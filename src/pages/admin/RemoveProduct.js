import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";

export default function RemoveProduct() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([
    { id: 1, code: "ACT-PC-0001", name: "Red Dead Redemption 2" },
    { id: 2, code: "ACT-PC-0002", name: "GTA V" },
    { id: 3, code: "BR-HAOL-0003", name: "Fortnite" },
    { id: 4, code: "SPT-XBX-0004", name: "FIFA 24" },
    { id: 5, code: "RAC-XBX-0005", name: "Forza Horizon 5" },
    { id: 6, code: "RAC-SW-0006", name: "Mario Kart 8 Deluxe" },
    { id: 7, code: "ACT-SW-0007", name: "The Legend of Zelda: TOTK" },
    { id: 8, code: "BR-PC-0008", name: "Call of Duty: Warzone" },
    { id: 9, code: "SPT-PS-0009", name: "NBA 2K24" },
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.code.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setProducts(products.filter(product => product.id !== selectedProduct.id));
    setShowModal(false);
    Alert.alert("Success", "Product removed successfully");
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedProduct(null);
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

        <Text style={styles.title}>Products</Text>

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

        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.codeColumn]}>Code</Text>
          <Text style={[styles.headerText, styles.nameColumn]}>Name</Text>
        </View>

        <ScrollView style={styles.list}>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productItem}
              onPress={() => handleSelectProduct(product)}
            >
              <Text style={styles.productCode}>{product.code}</Text>
              <Text style={styles.productName}>{product.name}</Text>
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
              Are you sure you want to remove this product?
            </Text>
            <Text style={styles.modalProduct}>{selectedProduct?.name}</Text>

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
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1B254F",
    marginBottom: 10,
  },
  headerText: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "600",
  },
  codeColumn: {
    width: 120,
  },
  nameColumn: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1B254F",
  },
  productCode: {
    color: "#fff",
    fontSize: 14,
    width: 120,
  },
  productName: {
    color: "#fff",
    fontSize: 15,
    flex: 1,
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
  modalProduct: {
    color: "#ff0000ff",
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