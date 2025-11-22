import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/adminStyles";
import { getProducts, getProductById } from "../../services/productService";

export default function ViewEditProduct() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carregar products da API
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      console.log('Loading products...');

      const response = await getProducts();
      console.log('Products loaded successfully:', response);

      // A API retorna um array de produtos
      if (Array.isArray(response)) {
        setProducts(response);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('=== Error loading products ===');
      console.error('Error:', error);
      console.error('Error message:', error.message);
      console.error('Error status:', error.statusCode);
      console.error('Error data:', error.data);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar produtos localmente
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    product.uuid?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectProduct = async (product) => {
    try {
      setLoading(true);
      console.log('Loading product details for UUID:', product.uuid);

      // Buscar dados completos do produto
      const fullProductData = await getProductById(product.uuid);
      console.log('Product details loaded:', fullProductData);

      navigation.navigate("EditProductForm", { product: fullProductData });
    } catch (error) {
      console.error('Error loading product details:', error);
    } finally {
      setLoading(false);
    }
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
        <Text style={[styles.headerText, styles.nameColumn]}>Games</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A855F7" />
        </View>
      ) : (
        <ScrollView style={styles.list}>
          {filteredProducts.map((product, index) => (
            <TouchableOpacity
              key={product.uuid || `product-${index}`}
              style={styles.productItem}
              onPress={() => handleSelectProduct(product)}
            >
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name || 'Unnamed'}</Text>
                <Text style={styles.productSubtitle}>{product.platform || 'N/A'}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
  nameColumn: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1B254F",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  productSubtitle: {
    color: "#A855F7",
    fontSize: 14,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});