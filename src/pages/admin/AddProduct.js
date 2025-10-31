import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { colors } from "../../styles/adminStyles";
import PrimaryButton from "../../components/admin/PrimaryButton";
import CategorySelector from "../../components/admin/CategorySelector";
import PlatformSelector from "../../components/admin/PlatformSelector";

export default function AddProduct() {
  const navigation = useNavigation();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need camera roll permissions to select an image.');
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
    if (!productName || !price || !description || !quantity || !selectedPlatform) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (selectedCategories.length === 0) {
      Alert.alert("Error", "Please select at least one category");
      return;
    }

    if (isNaN(price) || isNaN(quantity)) {
      Alert.alert("Error", "Price and quantity must be valid numbers");
      return;
    }

    Alert.alert("Success", "Product created successfully", [
      { text: "OK", onPress: () => navigation.goBack() }
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

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="0.00"
          placeholderTextColor="#666"
          keyboardType="decimal-pad"
        />

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

        <Text style={styles.label}>Quantity in stock</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          placeholder="0"
          placeholderTextColor="#666"
          keyboardType="numeric"
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