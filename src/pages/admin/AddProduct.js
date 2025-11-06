import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { colors } from "../../styles/adminStyles";
import PrimaryButton from "../../components/admin/PrimaryButton";
import CategorySelector from "../../components/admin/CategorySelector";
import PlatformSelector from "../../components/admin/PlatformSelector";
import CustomAlert from "../../components/admin/CustomAlert";

export default function AddProduct() {
  const navigation = useNavigation();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });
  const [exchangeRate] = useState(5.20); // Taxa de câmbio BRL para USD

  const formatBRL = (value) => {
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    const floatValue = parseFloat(numericValue) / 100;
    return floatValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePriceChange = (text) => {
    const numericValue = text.replace(/\D/g, '');
    setPrice(numericValue);
  };

  const getPriceInUSD = () => {
    if (!price) return '0.00';
    const floatValue = parseFloat(price) / 100;
    const usdValue = floatValue / exchangeRate;
    return usdValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      setAlertConfig({ type: 'error', message: 'We need camera roll permissions to select an image.' });
      setShowAlert(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProductImage(result.assets[0].uri);
    }
  };

  const handleCreateProduct = () => {
    if (!productName || !price || !description || !selectedPlatform) {
      setAlertConfig({ type: 'error', message: 'Please fill all required fields' });
      setShowAlert(true);
      return;
    }

    if (selectedCategories.length === 0) {
      setAlertConfig({ type: 'error', message: 'Please select at least one category' });
      setShowAlert(true);
      return;
    }

    if (!price || parseInt(price) <= 0) {
      setAlertConfig({ type: 'error', message: 'Price must be a valid number' });
      setShowAlert(true);
      return;
    }

    setAlertConfig({ type: 'success', message: 'Product created successfully' });
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertConfig.type === 'success') {
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

      <Text style={styles.title}>Add Product</Text>

      <ScrollView 
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
          placeholder="Enter product name"
          placeholderTextColor="#666"
        />

        <Text style={styles.label}>Price (BRL)</Text>
        <View style={styles.priceContainer}>
          <View style={styles.priceInputWrapper}>
            <Text style={styles.currencySymbol}>R$</Text>
            <TextInput
              style={styles.priceInput}
              value={formatBRL(price)}
              onChangeText={handlePriceChange}
              placeholder="0,00"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>
          {price && (
            <View style={styles.usdConversion}>
              <Text style={styles.usdLabel}>≈ ${getPriceInUSD()} USD</Text>
            </View>
          )}
        </View>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter product description"
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Product Photo</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          {productImage ? (
            <Image source={{ uri: productImage }} style={styles.productImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={40} color="#ffffffff" />
              <Text style={styles.imagePickerText}>
                Click to select an image (max 5MB){'\n'}
                PNG, JPG (Max. 800 x 400 px, 4:3 Ratio)
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <CategorySelector
          selectedCategories={selectedCategories}
          onSelectCategory={setSelectedCategories}
        />

        <PlatformSelector
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Create Product"
          onPress={handleCreateProduct}
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
  priceContainer: {
    marginBottom: 15,
  },
  priceInputWrapper: {
    backgroundColor: "#0D1429",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    color: "#A855F7",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  usdConversion: {
    marginTop: 8,
    paddingHorizontal: 15,
  },
  usdLabel: {
    color: "#22C55E",
    fontSize: 14,
    fontWeight: "600",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  imagePickerButton: {
    backgroundColor: "#0D1429",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ffffffff",
    borderStyle: "dashed",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    minHeight: 150,
  },
  imagePlaceholder: {
    alignItems: "center",
  },
  imagePickerText: {
    color: "#ffffffff",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
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