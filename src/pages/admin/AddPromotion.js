import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import PrimaryButton from "../../components/admin/PrimaryButton";
import SwitchButton from "../../components/admin/SwitchButton";
import CategorySelector from "../../components/admin/CategorySelector";
import PlatformSelectorUnlimited from "../../components/admin/PlatformSelectorUnlimited";
import DatePickerButton from "../../components/admin/DatePickerButton";

export default function AddPromotion() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [discountType, setDiscountType] = useState("Products Discount");
  const [productSelectionType, setProductSelectionType] = useState("Specific Products"); // NOVO
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedSpecificGames, setSelectedSpecificGames] = useState([]);
  const [promotionName, setPromotionName] = useState("");
  const [couponName, setCouponName] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [untilEndDate, setUntilEndDate] = useState(false);

  useEffect(() => {
    if (route.params?.selectedSpecificGames) {
      setSelectedSpecificGames(route.params.selectedSpecificGames);
    }
  }, [route.params?.selectedSpecificGames]);

  // Limpar seleções ao trocar tipo de produto
  const handleProductSelectionTypeChange = (type) => {
    setProductSelectionType(type);
    if (type === "Specific Products") {
      // Limpar categorias e plataformas
      setSelectedCategories([]);
      setSelectedPlatforms([]);
    } else {
      // Limpar jogos específicos
      setSelectedSpecificGames([]);
    }
  };

  const formatPercentage = (text) => {
    const numbers = text.replace(/[^0-9]/g, '');
    if (numbers === '') return '';
    const value = Math.min(parseInt(numbers), 100);
    return `${value}%`;
  };

  const handleDiscountChange = (text) => {
    setDiscountPercentage(formatPercentage(text));
  };

  const validateDates = (start, end) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start && start < today) {
      Alert.alert("Error", "Start date cannot be earlier than today");
      return false;
    }

    if (start && end && end < start) {
      Alert.alert("Error", "End date cannot be earlier than start date");
      return false;
    }

    return true;
  };

  const handleStartDateChange = (date) => {
    if (validateDates(date, endDate)) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (validateDates(startDate, date)) {
      setEndDate(date);
    }
  };

  const handleCreatePromotion = () => {
    if (!promotionName || !discountPercentage || !startDate || !endDate) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (discountType === "Coupon Discount" && !couponName) {
      Alert.alert("Error", "Please enter coupon name");
      return;
    }

    // Validação baseada no tipo de seleção
    if (productSelectionType === "Specific Products") {
      if (selectedSpecificGames.length === 0) {
        Alert.alert("Error", "Please select at least one specific game");
        return;
      }
    } else {
      if (selectedCategories.length === 0 && selectedPlatforms.length === 0) {
        Alert.alert("Error", "Please select at least one category or platform");
        return;
      }
    }

    if (!untilEndDate && (!quantity || parseInt(quantity) <= 0)) {
      Alert.alert("Error", "Please enter a valid quantity");
      return;
    }

    Alert.alert("Success", "Promotion created successfully", [
      { 
        text: "OK", 
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeAdm' }],
          });
        }
      }
    ]);
  };

  const handleGoBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeAdm' }],
    });
  };
  

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
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

      <Text style={styles.title}>Add Promotion</Text>

      <ScrollView 
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        {/* PRIMEIRO SWITCH - Tipo de Desconto */}
        <SwitchButton
          option1="Products Discount"
          option2="Coupon Discount"
          selected={discountType}
          onSelect={setDiscountType}
        />

        {/* SEGUNDO SWITCH - Tipo de Seleção de Produto */}
        <SwitchButton
          option1="Specific Products"
          option2="Product Groups"
          selected={productSelectionType}
          onSelect={handleProductSelectionTypeChange}
        />

        {/* SELEÇÃO DE CATEGORIAS - Habilitado apenas para "Product Groups" */}
        <View style={productSelectionType === "Specific Products" && styles.disabledSection}>
          <CategorySelector
            selectedCategories={selectedCategories}
            onSelectCategory={productSelectionType === "Product Groups" ? setSelectedCategories : () => {}}
          />
        </View>

        {/* SELEÇÃO DE PLATAFORMAS - Habilitado apenas para "Product Groups" */}
        <View style={productSelectionType === "Specific Products" && styles.disabledSection}>
          <PlatformSelectorUnlimited
            selectedPlatforms={selectedPlatforms}
            onSelectPlatforms={productSelectionType === "Product Groups" ? setSelectedPlatforms : () => {}}
          />
        </View>

        {/* SELEÇÃO DE JOGOS ESPECÍFICOS - Habilitado apenas para "Specific Products" */}
        <View style={productSelectionType === "Product Groups" && styles.disabledSection}>
          <TouchableOpacity
            style={[
              styles.specificGamesButton,
              productSelectionType === "Product Groups" && styles.disabledButton
            ]}
            onPress={() => {
              if (productSelectionType === "Specific Products") {
                navigation.navigate("SelectSpecificGames", { 
                  selectedGames: selectedSpecificGames,
                  returnRoute: "AddPromotion"
                });
              }
            }}
            disabled={productSelectionType === "Product Groups"}
          >
            <Text style={[
              styles.specificGamesButtonText,
              productSelectionType === "Product Groups" && styles.disabledText
            ]}>
              Select Specific Games
            </Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={productSelectionType === "Product Groups" ? "#666" : "#A855F7"} 
            />
          </TouchableOpacity>

          {selectedSpecificGames.length > 0 && (
            <View style={styles.selectedGamesContainer}>
              <Text style={styles.selectedGamesTitle}>Selected Games:</Text>
              {selectedSpecificGames.map((sg, index) => (
                <Text key={index} style={styles.selectedGameText}>
                  • {sg.gameName} - {sg.platform}
                </Text>
              ))}
            </View>
          )}
        </View>

        <Text style={styles.label}>Promotion Name</Text>
        <TextInput
          style={styles.input}
          value={promotionName}
          onChangeText={setPromotionName}
          placeholder="Enter promotion name"
          placeholderTextColor="#666"
        />

        {discountType === "Coupon Discount" && (
          <>
            <Text style={styles.label}>Coupon Name</Text>
            <TextInput
              style={styles.input}
              value={couponName}
              onChangeText={setCouponName}
              placeholder="Enter coupon code"
              placeholderTextColor="#666"
            />
          </>
        )}

        <Text style={styles.label}>Discount Percentage</Text>
        <TextInput
          style={styles.input}
          value={discountPercentage}
          onChangeText={handleDiscountChange}
          placeholder="0%"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Start Date</Text>
        <DatePickerButton
          date={startDate}
          onDateChange={handleStartDateChange}
        />

        <Text style={styles.label}>End Date</Text>
        <DatePickerButton
          date={endDate}
          onDateChange={handleEndDateChange}
        />

        <Text style={styles.label}>Quantity</Text>
        <View style={styles.quantityContainer}>
          <TextInput
            style={[styles.input, styles.quantityInput, untilEndDate && styles.disabledInput]}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="0"
            placeholderTextColor="#666"
            keyboardType="numeric"
            editable={!untilEndDate}
          />
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setUntilEndDate(!untilEndDate)}
          >
            <View style={[styles.checkbox, untilEndDate && styles.checkboxSelected]}>
              {untilEndDate && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>Until end date</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Create Promotion"
          onPress={handleCreatePromotion}
        />
      </View>
    </KeyboardAvoidingView>
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
  formScroll: {
    flex: 1,
  },
  formContent: {
    paddingBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#0D1429",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
  },
  disabledInput: {
    opacity: 0.5,
  },
  disabledSection: {
    opacity: 0.4,
    pointerEvents: "none",
  },
  specificGamesButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#A855F7",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  disabledButton: {
    borderColor: "#666",
  },
  specificGamesButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  disabledText: {
    color: "#666",
  },
  selectedGamesContainer: {
    backgroundColor: "#0D1429",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  selectedGamesTitle: {
    color: "#A855F7",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  selectedGameText: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 4,
  },
  quantityContainer: {
    marginBottom: 15,
  },
  quantityInput: {
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#A855F7",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#A855F7",
  },
  checkboxLabel: {
    color: "#fff",
    fontSize: 14,
  },
  buttonContainer: {
    paddingVertical: 10,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: "#1B254F",
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});