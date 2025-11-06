import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import PrimaryButton from "../../components/admin/PrimaryButton";

export default function SelectPromotion() {
  const navigation = useNavigation();
  const route = useRoute();
  const [searchText, setSearchText] = useState("");
  const returnRoute = route.params?.returnRoute || "AddNotification";

  // Mock data - Promotions ativas e em validação
  const promotions = [
    { 
      id: 1, 
      name: "Black Friday 2024", 
      discount: "50%", 
      startDate: "2024-11-20",
      endDate: "2024-11-30",
      status: "Active"
    },
    { 
      id: 2, 
      name: "Summer Sale", 
      discount: "30%", 
      startDate: "2025-06-01",
      endDate: "2025-06-30",
      status: "Scheduled"
    },
    { 
      id: 4, 
      name: "Winter Deals", 
      discount: "40%", 
      startDate: "2024-12-01",
      endDate: "2025-02-28",
      status: "Active"
    },
  ];

  const filteredPromotions = promotions.filter(promo =>
    promo.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectPromotion = (promotion) => {
    const formattedStartDate = new Date(promotion.startDate).toLocaleDateString('pt-BR');
    const formattedEndDate = new Date(promotion.endDate).toLocaleDateString('pt-BR');
    
    navigation.navigate(returnRoute, { 
      selectedPromotion: {
        id: promotion.id,
        title: promotion.name,
        subtitle: `${promotion.discount} de desconto • ${formattedStartDate} até ${formattedEndDate}`,
        discount: promotion.discount,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }
    });
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

      <Text style={styles.title}>Select Promotion</Text>

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
        {filteredPromotions.map((promotion) => (
          <TouchableOpacity
            key={promotion.id}
            style={styles.promotionItem}
            onPress={() => handleSelectPromotion(promotion)}
          >
            <View style={styles.promotionInfo}>
              <Text style={styles.promotionName}>{promotion.name}</Text>
              <Text style={styles.promotionDetails}>
                {promotion.discount} • {promotion.startDate} até {promotion.endDate}
              </Text>
            </View>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: promotion.status === "Active" ? "#22C55E" : "#F59E0B" }
            ]}>
              <Text style={styles.statusText}>{promotion.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});