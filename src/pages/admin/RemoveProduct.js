import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import CustomAlert from "../../components/admin/CustomAlert";
import ConfirmModal from "../../components/admin/ConfirmModal";

export default function RemoveProduct() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });
  const [selectedItems, setSelectedItems] = useState([]);

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

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredProducts.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredProducts.map(item => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      setAlertConfig({ type: 'error', message: 'Please select at least one item to delete' });
      setShowAlert(true);
      return;
    }
    setShowModal(true);
    setSelectedProduct({ count: selectedItems.length });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct?.count) {
      // Delete multiple
      setProducts(products.filter(product => !selectedItems.includes(product.id)));
      setAlertConfig({ type: 'success', message: `${selectedItems.length} product(s) removed successfully` });
      setSelectedItems([]);
    } else {
      // Delete single
      setProducts(products.filter(product => product.id !== selectedProduct.id));
      setAlertConfig({ type: 'success', message: 'Product removed successfully' });
    }
    setShowModal(false);
    setShowAlert(true);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedProduct(null);
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

        {selectedItems.length > 0 && (
          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.selectAllButton} onPress={toggleSelectAll}>
              <Ionicons
                name={selectedItems.length === filteredProducts.length ? "checkbox" : "square-outline"}
                size={20}
                color="#A855F7"
              />
              <Text style={styles.selectAllText}>
                {selectedItems.length === filteredProducts.length ? 'Deselect All' : 'Select All'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteSelected}>
              <Ionicons name="trash" size={20} color="#fff" />
              <Text style={styles.deleteButtonText}>Delete ({selectedItems.length})</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView style={styles.list}>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.itemCard}
              onPress={() => toggleItemSelection(product.id)}
            >
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => toggleItemSelection(product.id)}
              >
                <Ionicons
                  name={selectedItems.includes(product.id) ? "checkbox" : "square-outline"}
                  size={24}
                  color="#A855F7"
                />
              </TouchableOpacity>

              <View style={styles.itemInfo}>
                <Text style={styles.productCode}>{product.code}</Text>
                <Text style={styles.productName}>{product.name}</Text>
              </View>

              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  handleSelectProduct(product);
                }}
              >
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>
      </SafeAreaView>

      <ConfirmModal
        visible={showModal}
        title="Confirm Deletion"
        message={
          selectedProduct?.count
            ? `Are you sure you want to remove ${selectedProduct.count} products?`
            : "Are you sure you want to remove this product?"
        }
        highlightText={selectedProduct?.count ? null : selectedProduct?.name}
        confirmText="Delete"
        confirmColor="#EF4444"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
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
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EF4444",
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
    fontWeight: "600",
  },
  productName: {
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