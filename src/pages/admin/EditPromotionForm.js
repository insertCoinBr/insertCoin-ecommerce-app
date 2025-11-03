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
import PermissionDropdown from "../../components/admin/PermissionDropdown";

export default function EditPromotionForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { promotion } = route.params;
  
  const [discountType, setDiscountType] = useState(promotion.type);
  const [selectedCategories, setSelectedCategories] = useState(["Action"]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(["PC"]);
  const [selectedSpecificGames, setSelectedSpecificGames] = useState([]);
  const [promotionName, setPromotionName] = useState(promotion.name);
  const [couponName, setCouponName] = useState("BLACKFRIDAY50");
  const [discountPercentage, setDiscountPercentage] = useState(promotion.discount);
  const [startDate, setStartDate] = useState(new Date(promotion.startDate));
  const [endDate, setEndDate] = useState(new Date(promotion.endDate));
  const [quantity, setQuantity] = useState("1000");
  const [untilEndDate, setUntilEndDate] = useState(false);
  const [status, setStatus] = useState(promotion.status);

  useEffect(() => {
    if (route.params?.selectedSpecificGames) {
      setSelectedSpecificGames(route.params.selectedSpecificGames);
    }
  }, [route.params?.selectedSpecificGames]);

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

  const statusOptions = ["Active", "Scheduled", "Ended", "Cancelled"];

  const handleUpdatePromotion = () => {
    if (!promotionName || !discountPercentage || !startDate || !endDate) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (discountType === "Coupon Discount" && !couponName) {
      Alert.alert("Error", "Please enter coupon name");
      return;
    }

    if (selectedCategories.length === 0 && selectedPlatforms.length === 0 && selectedSpecificGames.length === 0) {
      Alert.alert("Error", "Please select at least one option: categories, platforms, or specific games");
      return;
    }

    if (!untilEndDate && (!quantity || parseInt(quantity) <= 0)) {
      Alert.alert("Error", "Please enter a valid quantity");
      return;
    }

    Alert.alert("Success", "Promotion updated successfully", [
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

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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

      <Text style={styles.title}>Edit Promotion</Text>

      <ScrollView 
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        <SwitchButton
          option1="Products Discount"
          option2="Coupon Discount"
          selected={discountType}
          onSelect={setDiscountType}
        />

        <CategorySelector
          selectedCategories={selectedCategories}
          onSelectCategory={setSelectedCategories}
        />

        <PlatformSelectorUnlimited
          selectedPlatforms={selectedPlatforms}
          onSelectPlatforms={setSelectedPlatforms}
        />

        <TouchableOpacity
          style={styles.specificGamesButton}
          onPress={() => navigation.navigate("SelectSpecificGames", { 
            selectedGames: selectedSpecificGames,
            returnRoute: "EditPromotionForm"
          })}
        >
          <Text style={styles.specificGamesButtonText}>
            Select Specific Games
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A855F7" />
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

        <Text style={styles.label}>Promotion Name</Text>
        <TextInput
          style={styles.input}
          value={promotionName}
          onChangeText={setPromotionName}
        />

        {discountType === "Coupon Discount" && (
          <>
            <Text style={styles.label}>Coupon Name</Text>
            <TextInput
              style={styles.input}
              value={couponName}
              onChangeText={setCouponName}
            />
          </>
        )}

        <Text style={styles.label}>Discount Percentage</Text>
        <TextInput
          style={styles.input}
          value={discountPercentage}
          onChangeText={handleDiscountChange}
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

        <Text style={styles.label}>Status</Text>
        <PermissionDropdown
          selectedPermission={status}
          onSelectPermission={setStatus}
          permissions={statusOptions}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Update Promotion"
          onPress={handleUpdatePromotion}
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
  specificGamesButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedGamesContainer: {
    backgroundColor: "#0D1429",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  selectedGamesTitle: {
    color: "#ffffffff",
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
    borderColor: "#ffffffff",
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