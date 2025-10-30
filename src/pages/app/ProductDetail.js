import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView, 
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProdutoById } from "../../services/produtosService";

// Paleta de cores para consistência
const COLORS = {
  background: '#F7F8FA',
  white: '#FFFFFF',
  primary: '#4C38A4',
  textDark: '#212121',
  text: '#333333',
  textMuted: '#666666',
  border: '#EAEAEA',
};

export default function ProductDetail({ route }) {
  const { produto } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

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
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product?.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.category}>{product?.category}</Text>
          <Text style={styles.name}>{product?.title}</Text>
          <Text style={styles.price}>R$ {product?.price.toFixed(2)}</Text>
          
          <View style={styles.separator} />
          
          <Text style={styles.descriptionTitle}>Sobre este item</Text>
          <Text style={styles.descriptionText}>{product?.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1, 
    backgroundColor: COLORS.white, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  category: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textDark,
    lineHeight: 30,
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 24,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 24, 
  },
});