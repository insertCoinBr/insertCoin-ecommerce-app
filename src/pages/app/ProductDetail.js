import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image,
  StyleSheet, 
  ActivityIndicator, 
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import RPGBorder from "../../components/app/RPGBorder";
import InfoRow from "../../components/app/InfoRow";

// SERVICES
import { getProdutoById } from "../../services/produtosService";

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
  success: "#6ABE30",
  warning: "#FFD700",
};

// Chaves do AsyncStorage
const CART_STORAGE_KEY = '@insertcoin:cart';
const FAVORITES_STORAGE_KEY = '@insertcoin:favorites';

export default function ProductDetail({ route, navigation }) {
  const fontLoaded = useFontLoader();
  const { produto } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (produto.description) {
      setProduct(produto);
      checkFavoriteStatus(produto.id);
      checkCartStatus(produto.id);
    } else {
      fetchProduct();
    }
  }, [produto]);

  async function fetchProduct() {
    setLoading(true);
    const response = await getProdutoById(produto.id);
    setProduct(response);
    checkFavoriteStatus(response.id);
    checkCartStatus(response.id);
    setLoading(false);
  }

  // 🔍 Verifica se o produto está nos favoritos
  const checkFavoriteStatus = async (productId) => {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (favoritesJson) {
        const favorites = JSON.parse(favoritesJson);
        const isFav = favorites.some(fav => fav.id === productId);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error('Erro ao verificar favoritos:', error);
    }
  };

  // Verifica se o produto está no carrinho
  const checkCartStatus = async (productId) => {
    try {
      const cartJson = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (cartJson) {
        const cart = JSON.parse(cartJson);
        const inCart = cart.some(item => item.id === productId);
        setIsInCart(inCart);
      }
    } catch (error) {
      console.error('Erro ao verificar carrinho:', error);
    }
  };

  // Toggle Favorito
  const handleToggleFavorite = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      let favorites = favoritesJson ? JSON.parse(favoritesJson) : [];

      if (isFavorite) {
        // Remove dos favoritos
        favorites = favorites.filter(fav => fav.id !== product.id);
        setIsFavorite(false);
        Alert.alert(
          "Removido dos Favoritos",
          `${product.title} foi removido da sua lista de desejos.`
        );
      } else {
        // Adiciona aos favoritos
        favorites.push({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price
        });
        setIsFavorite(true);
        Alert.alert(
          "Adicionado aos Favoritos",
          `${product.title} foi adicionado à sua lista de desejos!`
        );
      }

      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Erro ao salvar favorito:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os favoritos.');
    }
  };

  // Adicionar ao Carrinho
  const handleAddToCart = async () => {
    try {
      const cartJson = await AsyncStorage.getItem(CART_STORAGE_KEY);
      let cart = cartJson ? JSON.parse(cartJson) : [];

      // Verifica se já existe no carrinho
      const existingItemIndex = cart.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Se já existe, incrementa a quantidade
        cart[existingItemIndex].quantity += 1;
      } else {
        // Se não existe, adiciona novo item
        cart.push({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: 1
        });
      }

      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      setIsInCart(true);

      Alert.alert(
        "Adicionado ao Carrinho",
        `${product.title} foi adicionado ao seu carrinho!`,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      Alert.alert('Erro', 'Não foi possível adicionar ao carrinho.');
    }
  };

  //  Comprar Agora
  const handleBuyNow = () => {
    Alert.alert(
      "Comprar Agora",
      "Você será redirecionado para o checkout.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Continuar", 
          onPress: () => navigation.navigate('Payment', { total: product.price })
        }
      ]
    );
  };

  if (!fontLoaded || loading || !product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <PageHeader 
          onBackPress={() => navigation.goBack()} 
          title="Detalhes do Produto"
        />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando detalhes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Detalhes do Produto"
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Imagem do Produto */}
        <View style={styles.imageWrapper}>
          <RPGBorder 
            width={345} 
            height={220} 
            tileSize={10}
            centerImage={{ uri: product.image }}
            imageResizeMode="stretch"
            borderType="black"
          />
        </View>

        {/* Card Título e Preço */}
        <View style={styles.mainInfoWrapper}>
          <RPGBorder 
            width={345} 
            height={140} 
            tileSize={10}
            centerColor={COLORS.primary}
            borderType="black"
          >
            <View style={styles.mainInfo}>
              <Text style={styles.productTitle} numberOfLines={3}>
                {product.title}
              </Text>

              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Preço:</Text>
                <Text style={styles.priceValue}>
                  R$ {Number(product.price || 0).toFixed(2)}
                </Text>
              </View>
            </View>
          </RPGBorder>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionsWrapper}>
          <View style={styles.actionRow}>
            {/* Favoritar */}
            <TouchableOpacity 
              onPress={handleToggleFavorite}
              activeOpacity={0.8}
              style={styles.favoriteButtonWrapper}
            >
              <RPGBorder 
                width={100} 
                height={55} 
                tileSize={8}
                centerColor={COLORS.secondary}
                borderType="blue"
              >
                <View style={styles.favoriteButton}>
                  <Image
                    source={
                      isFavorite 
                        ? require('../../../assets/IconsPixel/iconHeart.png')
                        : require('../../../assets/IconsPixel/iconHeartNull.png')
                    }
                    style={styles.heartIcon}
                    resizeMode="contain"
                  />
                </View>
              </RPGBorder>
            </TouchableOpacity>

            {/* Adicionar ao Carrinho */}
            <TouchableOpacity 
              onPress={handleAddToCart}
              activeOpacity={0.8}
              style={styles.addToCartButtonWrapper}
            >
              <RPGBorder 
                width={235} 
                height={55} 
                tileSize={8}
                centerColor={isInCart ? "#4CAF50" : COLORS.success}
                borderType="green"
              >
                <View style={styles.addToCartButton}>
                  <Icon name="cart-plus" size={20} color="#FFFFFF" />
                  <Text style={styles.buttonText}>
                    {isInCart ? "NO CARRINHO" : "ADD CARRINHO"}
                  </Text>
                </View>
              </RPGBorder>
            </TouchableOpacity>
          </View>

          {/* Comprar Agora */}
          <TouchableOpacity 
            onPress={handleBuyNow}
            activeOpacity={0.8}
            style={styles.buyNowButtonWrapper}
          >
            <RPGBorder 
              width={345} 
              height={64} 
              tileSize={8}
              centerColor={COLORS.secondary}
              borderType="blue"
            >
              <View style={styles.buyNowButton}>
                <Icon name="cash-fast" size={24} color="#FFD700" />
                <Text style={styles.buyNowButtonText}>COMPRAR AGORA</Text>
              </View>
            </RPGBorder>
          </TouchableOpacity>
        </View>

        {/* Seção Sobre */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>SOBRE O PRODUTO</Text>
          <RPGBorder 
            width={345} 
            height={240} 
            tileSize={8}
            centerColor={COLORS.secondary}
            borderType="blue"
          >
            <View style={styles.aboutSection}>
              <InfoRow label="Categoria" value={product.category} />
              <InfoRow label="Plataforma" value="Steam" />
              
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionLabel}>Descrição:</Text>
                <ScrollView 
                  style={styles.descriptionScroll}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                >
                  <Text style={styles.descriptionText}>{product.description}</Text>
                </ScrollView>
              </View>
            </View>
          </RPGBorder>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 16,
    fontFamily: 'VT323',
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 16,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mainInfoWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mainInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "VT323",
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  priceLabel: {
    color: "#CCCCCC",
    fontSize: 20,
    fontFamily: "VT323",
  },
  priceValue: {
    color: "#3cff00ff",
    fontSize: 32,
    fontFamily: "VT323",
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  actionsWrapper: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 345,
    marginBottom: 12,
  },
  favoriteButtonWrapper: {
    alignItems: 'center',
  },
  favoriteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
  addToCartButtonWrapper: {
    alignItems: 'center',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
  },
  buyNowButtonWrapper: {
    alignItems: 'center',
  },
  buyNowButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  buyNowButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "VT323",
  },
  sectionWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "VT323",
    marginBottom: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  aboutSection: {
    flex: 1,
  },
  descriptionContainer: {
    flex: 1,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  descriptionLabel: {
    color: "#CCCCCC",
    fontSize: 18,
    fontFamily: "VT323",
    marginBottom: 6,
  },
  descriptionScroll: {
    flex: 1,
    maxHeight: 100,
  },
  descriptionText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "VT323",
    lineHeight: 18,
  },
});