import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// COMPONENTES
import PageHeader from "../../components/PageHeader";
import RPGBorder from "../../components/RPGBorder";
import ImageCarousel from "../../components/ImageCarousel";
import InfoRow from "../../components/InfoRow";
import ActionButton from "../../components/ActionButton";

// SERVICES
import { getProdutoById } from "../../services/produtosService";

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
  success: "#00C851",
  warning: "#FFD700",
};

export default function ProductDetail({ route, navigation }) {
  const fontLoaded = useFontLoader();
  const { produto } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (produto.description) {
      setProduct(produto);
    } else {
      fetchProduct();
    }
  }, [produto]);

  async function fetchProduct() {
    setLoading(true);
    const response = await getProdutoById(produto.id);
    setProduct(response);
    setLoading(false);
  }

  const handleAddToCart = () => {
    Alert.alert(
      "Adicionado ao Carrinho",
      `${product.title} foi adicionado ao seu carrinho!`,
      [{ text: "OK" }]
    );
  };

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

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert(
      isFavorite ? "Removido dos Favoritos" : "Adicionado aos Favoritos",
      isFavorite 
        ? `${product.title} foi removido da sua lista de desejos.`
        : `${product.title} foi adicionado à sua lista de desejos!`
    );
  };

  if (!fontLoaded || loading || !product) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
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
        {/* Carrossel de Imagens */}
        <ImageCarousel images={[product.image]} />

        {/* Informações Principais */}
        <View style={styles.mainInfoWrapper}>
          <RPGBorder 
            width={345} 
            height="auto" 
            tileSize={10}
            centerColor={COLORS.primary}
            borderType="black"
          >
            <View style={styles.mainInfo}>
              <Text style={styles.productTitle} numberOfLines={3}>
                {product.title}
              </Text>

              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Preço</Text>
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
            {/* Botão Favoritar */}
            <TouchableOpacity 
              onPress={handleToggleFavorite}
              activeOpacity={0.8}
              style={styles.favoriteButtonWrapper}
            >
              <RPGBorder 
                width={100} 
                height={55} 
                tileSize={8}
                centerColor={isFavorite ? COLORS.warning : COLORS.secondary}
                borderType={isFavorite ? "black" : "blue"}
              >
                <View style={styles.favoriteButton}>
                  <Icon 
                    name={isFavorite ? "heart" : "heart-outline"} 
                    size={24} 
                    color="#FFFFFF" 
                  />
                </View>
              </RPGBorder>
            </TouchableOpacity>

            {/* Botão Adicionar ao Carrinho */}
            <TouchableOpacity 
              onPress={handleAddToCart}
              activeOpacity={0.8}
              style={styles.addToCartButtonWrapper}
            >
              <RPGBorder 
                width={235} 
                height={55} 
                tileSize={8}
                centerColor={COLORS.success}
                borderType="green"
              >
                <View style={styles.addToCartButton}>
                  <Icon name="cart-plus" size={20} color="#FFFFFF" />
                  <Text style={styles.buttonText}>ADD CARRINHO</Text>
                </View>
              </RPGBorder>
            </TouchableOpacity>
          </View>

          {/* Botão Comprar Agora */}
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
          <Text style={styles.sectionTitle}>SOBRE</Text>
          <RPGBorder 
            width={345} 
            height="auto" 
            tileSize={8}
            centerColor={COLORS.secondary}
            borderType="blue"
          >
            <View style={styles.aboutSection}>
              <InfoRow label="Categoria" value={product.category} />
              <InfoRow label="Plataforma" value="Steam" />
              
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionLabel}>Descrição:</Text>
                <Text style={styles.descriptionText}>{product.description}</Text>
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
  },
  mainInfoWrapper: {
    alignItems: 'center',
    marginVertical: 16,
  },
  mainInfo: {
    padding: 16,
  },
  productTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "VT323",
    marginBottom: 16,
    lineHeight: 28,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
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
  sectionWrapper: {
    alignItems: 'center',
    marginVertical: 16,
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
    padding: 16,
  },
  descriptionContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  descriptionLabel: {
    color: "#CCCCCC",
    fontSize: 18,
    fontFamily: "VT323",
    marginBottom: 8,
  },
  descriptionText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "VT323",
    lineHeight: 20,
  },
  actionsWrapper: {
    alignItems: 'center',
    marginTop: 24,
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
});