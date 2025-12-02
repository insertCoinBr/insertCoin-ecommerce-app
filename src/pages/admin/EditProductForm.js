import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { colors } from "../../styles/adminStyles";
import PrimaryButton from "../../components/admin/PrimaryButton";
import CategorySelector from "../../components/admin/CategorySelector";
import PlatformSelector from "../../components/admin/PlatformSelector";
import CustomAlert from "../../components/admin/CustomAlert";
import { updateProduct } from "../../services/productService";

export default function EditProductForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const [productName, setProductName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price ? Math.floor(product.price * 100).toString() : "0");
  const [description, setDescription] = useState(product.description || "");
  const [productImage, setProductImage] = useState(product.imageUrl || product.img || null);
  const [selectedCategories, setSelectedCategories] = useState(product.category || []);
  const [selectedPlatform, setSelectedPlatform] = useState(product.platform || "");
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ type: 'error', message: '' });
  const [exchangeRate] = useState(5.20); // Taxa de câmbio BRL para USD
  const [loading, setLoading] = useState(false);

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
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProductImage(result.assets[0].uri);
    }
  };

  const handleUpdateProduct = async () => {
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

    setLoading(true);

    try {
      const priceInBRL = parseFloat(price) / 100;

      const productData = {
        name: productName,
        price: parseFloat(priceInBRL.toFixed(2)),
        category: selectedCategories,
        platform: selectedPlatform,
        description: description,
        img: productImage || product.imageUrl || product.img || "https://via.placeholder.com/300x400"
      };

      // console.log('=== Updating product ===');
      // console.log('Product UUID:', product.uuid);
      // console.log('Product Data:', JSON.stringify(productData, null, 2));

      await updateProduct(product.uuid || product.id, productData);

      // console.log('Product updated successfully!');
      setAlertConfig({ type: 'success', message: 'Product updated successfully' });
      setShowAlert(true);
    } catch (error) {
      console.error('=== Error updating product ===');
      console.error('Error:', error);
      console.error('Error message:', error.message);
      console.error('Error status:', error.statusCode);
      console.error('Error data:', error.data);

      setAlertConfig({
        type: 'error',
        message: error.message || 'Failed to update product. Please try again.'
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertConfig.type === 'success') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeAdm' }],
      });
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

      <Text style={styles.title}>Edit Product</Text>

      <ScrollView 
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Product Name:</Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.label}>Price (BRL):</Text>
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

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Product Photo</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          {productImage ? (
            <Image source={{ uri: productImage }} style={styles.productImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Image
                source={require("../../../assets/LogoInsetCoin1.png")}
                style={styles.productImage}
              />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.imageNote}>
          Click to select an image (max 5MB){'\n'}
          PNG, JPG (Recommended: 800x600px, 4:3)
        </Text>

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
          title="Update Product"
          onPress={handleUpdateProduct}
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
    overflow: "hidden",
    marginBottom: 8,
    aspectRatio: 1.33,
    width: "100%",
  },
  imagePlaceholder: {
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageNote: {
    color: "#ffffffff",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#A855F7",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  categoryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  platformButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#A855F7",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  platformButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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