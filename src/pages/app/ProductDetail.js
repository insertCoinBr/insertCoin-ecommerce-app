import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from "@react-navigation/native";

// IMPORTAR OS CONTEXTS
import { CartContext } from "../../context/CartContext";
import { FavoritesContext } from "../../context/FavoritesContext";
import { CurrencyContext } from "../../context/CurrencyContext";
import { RatingsContext } from "../../context/RatingsContext";
import { useAlert } from "../../context/AlertContext";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import RPGBorder from "../../components/app/RPGBorder";
import InfoRow from "../../components/app/InfoRow";
import BottomTabBar from "../../components/app/BottomTabBar";
import StarRating from "../../components/app/StarRating";

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

export default function ProductDetail({ route, navigation }) {
  const fontLoaded = useFontLoader();
  const { produto } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [rating, setRating] = useState({ averageRating: 0, totalRatings: 0 });

  //USAR O CARTCONTEXT
  const {
    addToCart,
    isInCart,
    getItemQuantity,
    loading: cartLoading
  } = useContext(CartContext);

  //USAR O FAVORITESCONTEXT
  const {
    toggleFavorite,
    isFavorite
  } = useContext(FavoritesContext);

  //USAR O ALERT CUSTOMIZADO
  const { showSuccess, showError, showConfirm } = useAlert();

  //USAR O CURRENCYCONTEXT
  const { formatPrice } = useContext(CurrencyContext);

  //USAR O RATINGSCONTEXT
  const { getProductRatingData } = useContext(RatingsContext);

  useEffect(() => {
    if (produto.description) {
      setProduct(produto);
      loadRating();
    } else {
      fetchProduct();
    }
  }, [produto]);

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Home");
    }, [])
  );

  async function fetchProduct() {
    setLoading(true);
    const response = await getProdutoById(produto.id);
    setProduct(response);
    setLoading(false);
    loadRating();
  }

  async function loadRating() {
    const ratingData = await getProductRatingData(produto.id);

    // Se não houver avaliações no AsyncStorage, usa o campo avaliation do produto
    if (ratingData.totalRatings === 0 && produto.avaliation !== undefined) {
      setRating({
        averageRating: produto.avaliation,
        totalRatings: 1 // Simula que tem pelo menos 1 avaliação
      });
    } else {
      setRating(ratingData);
    }
  }

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  //TOGGLE FAVORITO USANDO CONTEXT
  const handleToggleFavorite = async () => {
    // Verifica o estado ANTES de fazer o toggle
    const wasFavorite = isFavorite(product.id);
    const success = await toggleFavorite(product);

    if (success) {
      // Se estava nos favoritos, foi REMOVIDO
      // Se não estava nos favoritos, foi ADICIONADO
      if (wasFavorite) {
        showSuccess(
          "Removido dos Favoritos",
          `${product.title} foi removido da sua lista de desejos.`
        );
      } else {
        showSuccess(
          "Adicionado aos Favoritos",
          `${product.title} foi adicionado à sua lista de desejos!`
        );
      }
    } else {
      showError('Erro', 'Não foi possível atualizar os favoritos.');
    }
  };

  //ADICIONAR AO CARRINHO USANDO CONTEXT
  const handleAddToCart = async () => {
    const success = await addToCart(product);

    if (success) {
      showConfirm(
        "Adicionado ao Carrinho",
        `${product.title} foi adicionado ao seu carrinho!`,
        () => navigation.navigate('carts'), // Ir para carrinho
        {
          confirmText: "Ir para Carrinho",
          cancelText: "Continuar Comprando",
          type: "success",
          onCancel: () => navigation.navigate('ProductList') // Voltar para home
        }
      );
    } else {
      showError('Erro', 'Não foi possível adicionar ao carrinho.');
    }
  };

  // COMPRAR AGORA - Adiciona ao carrinho e vai para pagamento
  const handleBuyNow = async () => {
    // Adiciona ao carrinho se ainda não estiver
    if (!isInCart(product.id)) {
      await addToCart(product);
    }
    
    // Vai direto para o pagamento
    navigation.navigate('Payment', { total: product.price });
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

  // VERIFICAR SE ESTÁ NO CARRINHO
  const productInCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

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
            widthPercent={0.91}
            aspectRatio={0.64}
            tileSize={10}
            centerImage={{ uri: product.image }}
            imageResizeMode="stretch"
            borderType="black"
            contentPadding={0}
          />
        </View>

        {/* Card Título e Preço */}
        <View style={styles.mainInfoWrapper}>
          <RPGBorder
            widthPercent={0.91}
            height={180}
            tileSize={10}
            centerColor={COLORS.primary}
            borderType="black"
            contentPadding={12}
            contentJustify="center"
            contentAlign="center"
          >
            <View style={styles.mainInfo}>
              <Text style={styles.productTitle} numberOfLines={2}>
                {product.title}
              </Text>

              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Preço:</Text>
                <Text style={styles.priceValue}>
                  {formatPrice(product.price)}
                </Text>
              </View>

              <View style={styles.ratingContainer}>
                <StarRating
                  rating={rating.averageRating}
                  totalRatings={rating.totalRatings}
                  size={16}
                  showNumber={true}
                  showTotal={true}
                />
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
            >
              <RPGBorder
                widthPercent={0.25}
                aspectRatio={0.6}
                tileSize={8}
                centerColor={COLORS.secondary}
                borderType="blue"
                contentPadding={8}
                contentJustify="center"
                contentAlign="center"
              >
                <View style={styles.favoriteButton}>
                  <Image
                    source={
                      isFavorite(product.id)
                        ? require('../../../assets/IconsPixel/iconHeart.png')
                        : require('../../../assets/IconsPixel/iconHeartNull.png')
                    }
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
              </RPGBorder>
            </TouchableOpacity>

            {/* ADICIONAR AO CARRINHO - VISUAL ATUALIZADO */}
            <TouchableOpacity
              onPress={handleAddToCart}
              activeOpacity={0.8}
              disabled={cartLoading}
            >
              <RPGBorder
                widthPercent={0.62}
                aspectRatio={0.26}
                tileSize={8}
                centerColor={productInCart ? "#6ABE30" : COLORS.success}
                borderType="green"
                contentPadding={8}
                contentJustify="center"
                contentAlign="center"
              >
                <View style={styles.addToCartButton}>
                  <Image
                    source={require('../../../assets/IconsPixel/iconMoney.png')}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                  <Text style={styles.buttonText}>
                    {productInCart ? `NO CARRINHO (${quantity})` : "ADD CARRINHO"}
                  </Text>
                </View>
              </RPGBorder>
            </TouchableOpacity>
          </View>

          {/* Comprar Agora */}
          <TouchableOpacity
            onPress={handleBuyNow}
            activeOpacity={0.8}
            disabled={cartLoading}
          >
            <RPGBorder
              widthPercent={0.9}
              aspectRatio={0.24}
              tileSize={8}
              centerColor={COLORS.secondary}
              borderType="blue"
              contentPadding={8}
              contentJustify="center"
              contentAlign="center"
            >
              <View style={styles.buyNowButton}>
                <Image
                  source={require('../../../assets/IconsPixel/iconCartWhite.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.buyNowButtonText}>COMPRAR AGORA</Text>
              </View>
            </RPGBorder>
          </TouchableOpacity>
        </View>

        {/* Seção Sobre */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>SOBRE O PRODUTO</Text>
          <RPGBorder
            widthPercent={0.9}
            aspectRatio={0.7}
            tileSize={8}
            centerColor={COLORS.secondary}
            borderType="blue"
            contentPadding={8}
            contentJustify="flex-start"
          >
            <View style={styles.aboutSection}>
              <InfoRow label="Categoria" value={product.category} />
              <InfoRow label="Plataforma" value={product.platform || "Steam"} />
              
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionLabel}>Descrição:</Text>
                  <Text style={styles.descriptionText}>{product.description}</Text>
                
              </View>
            </View>
          </RPGBorder>
        </View>
      </ScrollView>

      <BottomTabBar  
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
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
    paddingBottom: 120,
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
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  productTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "VT323",
    lineHeight: 22,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    paddingBottom: 6,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
  },
  priceLabel: {
    color: "#CCCCCC",
    fontSize: 18,
    fontFamily: "VT323",
  },
  priceValue: {
    color: "#3cff00ff",
    fontSize: 28,
    fontFamily: "VT323",
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ratingContainer: {
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    alignItems: 'center',
  },
  actionsWrapper: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 12,
    gap: 8,
  },
  favoriteButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  addToCartButton: {
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
  buyNowButton: {
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