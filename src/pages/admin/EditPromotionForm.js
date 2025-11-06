import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import PrimaryButton from "../../components/admin/PrimaryButton";
import SwitchButton from "../../components/admin/SwitchButton";
import CategorySelector from "../../components/admin/CategorySelector";
import PlatformSelectorUnlimited from "../../components/admin/PlatformSelectorUnlimited";
import DatePickerButton from "../../components/admin/DatePickerButton";
import PermissionDropdown from "../../components/admin/PermissionDropdown";
import CustomAlert from "../../components/admin/CustomAlert";

export default function EditPromotionForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { promotion } = route.params || {};

  const [discountType, setDiscountType] = useState(promotion?.type || "Products Discount");
  const [selectedCategories, setSelectedCategories] = useState(["Action"]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(["PC"]);
  const [selectedSpecificGames, setSelectedSpecificGames] = useState([]);
  const [promotionName, setPromotionName] = useState(promotion?.name || "");
  const [couponName, setCouponName] = useState("BLACKFRIDAY50");
  const [discountPercentage, setDiscountPercentage] = useState(promotion?.discount || "");
  const [startDate, setStartDate] = useState(promotion?.startDate ? new Date(promotion.startDate) : new Date());
  const [endDate, setEndDate] = useState(promotion?.endDate ? new Date(promotion.endDate) : new Date());
  const [status, setStatus] = useState(promotion?.status || "Active");
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });

  useEffect(() => {
    if (!promotion) {
      setAlertConfig({ type: 'error', message: 'Promotion data not found' });
      setShowAlert(true);
    }
  }, [promotion, navigation]);

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
      setAlertConfig({ type: 'error', message: 'Start date cannot be earlier than today' });
      setShowAlert(true);
      return false;
    }

    if (start && end && end < start) {
      setAlertConfig({ type: 'error', message: 'End date cannot be earlier than start date' });
      setShowAlert(true);
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
      setAlertConfig({ type: 'error', message: 'Please fill all required fields' });
      setShowAlert(true);
      return;
    }

    if (discountType === "Coupon Discount" && !couponName) {
      setAlertConfig({ type: 'error', message: 'Please enter coupon name' });
      setShowAlert(true);
      return;
    }

    if (selectedCategories.length === 0 && selectedPlatforms.length === 0 && selectedSpecificGames.length === 0) {
      setAlertConfig({ type: 'error', message: 'Please select at least one option: categories, platforms, or specific games' });
      setShowAlert(true);
      return;
    }

    setAlertConfig({ type: 'success', message: 'Promotion updated successfully' });
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertConfig.type === 'success') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeAdm' }],
      });
    }
    if (alertConfig.message === 'Promotion data not found') {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
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
            returnRoute: "EditPromotionForm",
            promotion: promotion
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

        <CustomAlert
          visible={showAlert}
          type={alertConfig.type}
          message={alertConfig.message}
          onClose={handleAlertClose}
        />
      </KeyboardAvoidingView>
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