import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import CustomAlert from "../../components/admin/CustomAlert";
import ConfirmModal from "../../components/admin/ConfirmModal";

export default function RemovePromotion() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });
  const [selectedItems, setSelectedItems] = useState([]);

  const [promotions, setPromotions] = useState([
    { id: 1, name: "Black Friday 2024", discount: "50%", type: "Products Discount", status: "Active" },
    { id: 2, name: "Summer Sale", discount: "30%", type: "Coupon Discount", status: "Scheduled" },
    { id: 3, name: "New Year Special", discount: "25%", type: "Products Discount", status: "Ended" },
    { id: 4, name: "Winter Deals", discount: "40%", type: "Products Discount", status: "Active" },
    { id: 5, name: "Spring Promo", discount: "20%", type: "Coupon Discount", status: "Cancelled" },
  ]);

  const filteredPromotions = promotions.filter(promo =>
    promo.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "#22C55E";
      case "Scheduled": return "#F59E0B";
      case "Ended": return "#EF4444";
      case "Cancelled": return "#6B7280";
      default: return "#aaa";
    }
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredPromotions.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredPromotions.map(item => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      setAlertConfig({ type: 'error', message: 'Please select at least one item to delete' });
      setShowAlert(true);
      return;
    }
    setShowModal(true);
    setSelectedPromotion({ count: selectedItems.length });
  };

  const handleSelectPromotion = (promotion) => {
    setSelectedPromotion(promotion);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPromotion?.count) {
      // Delete multiple
      setPromotions(promotions.filter(promo => !selectedItems.includes(promo.id)));
      setAlertConfig({ type: 'success', message: `${selectedItems.length} promotion(s) removed successfully` });
      setSelectedItems([]);
    } else {
      // Delete single
      setPromotions(promotions.filter(promo => promo.id !== selectedPromotion.id));
      setAlertConfig({ type: 'success', message: 'Promotion removed successfully' });
    }
    setShowModal(false);
    setShowAlert(true);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedPromotion(null);
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

        <Text style={styles.title}>Promotions</Text>

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
                name={selectedItems.length === filteredPromotions.length ? "checkbox" : "square-outline"}
                size={20}
                color="#A855F7"
              />
              <Text style={styles.selectAllText}>
                {selectedItems.length === filteredPromotions.length ? 'Deselect All' : 'Select All'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteSelected}>
              <Ionicons name="trash" size={20} color="#fff" />
              <Text style={styles.deleteButtonText}>Delete ({selectedItems.length})</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView style={styles.list}>
          {filteredPromotions.map((promotion) => (
            <TouchableOpacity
              key={promotion.id}
              style={styles.itemCard}
              onPress={() => toggleItemSelection(promotion.id)}
            >
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => toggleItemSelection(promotion.id)}
              >
                <Ionicons
                  name={selectedItems.includes(promotion.id) ? "checkbox" : "square-outline"}
                  size={24}
                  color="#A855F7"
                />
              </TouchableOpacity>

              <View style={styles.itemInfo}>
                <Text style={styles.promotionName}>{promotion.name}</Text>
                <Text style={styles.promotionDetails}>
                  {promotion.discount} - {promotion.type}
                </Text>
              </View>

              <View style={styles.rightSection}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(promotion.status) }]}>
                  <Text style={styles.statusText}>{promotion.status}</Text>
                </View>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    handleSelectPromotion(promotion);
                  }}
                >
                  <Ionicons name="trash-outline" size={20} color="#EF4444" style={styles.trashIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>
      </SafeAreaView>

      <ConfirmModal
        visible={showModal}
        title="Confirm Deletion"
        message={
          selectedPromotion?.count
            ? `Are you sure you want to remove ${selectedPromotion.count} promotions?`
            : "Are you sure you want to remove this promotion?"
        }
        highlightText={selectedPromotion?.count ? null : selectedPromotion?.name}
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
  promotionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0D1429",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  promotionInfo: {
    flex: 1,
  },
  promotionName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  promotionDetails: {
    color: "#aaa",
    fontSize: 13,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  statusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  trashIcon: {
    marginLeft: 5,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});