import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import TotalCard from "../../components/app/TotalCard";
import StarRatingInput from "../../components/app/StarRatingInput";
import RPGBorder from "../../components/app/RPGBorder";

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

// CONTEXTS
import { RatingsContext } from "../../context/RatingsContext";
import { AuthContext } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1E40AF",
};

const { height, width } = Dimensions.get('window');

export default function OrderDetails({ navigation, route }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Orders');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratedProducts, setRatedProducts] = useState({});

  // Pega o número do pedido da navegação
  const { orderNumber } = route.params || { orderNumber: "XXXX-XXXX" };

  // Contexts
  const { rateProduct, hasRated, getUserRatingData } = useContext(RatingsContext);
  const { showSuccess, showError } = useAlert();

  useEffect(() => {
    // Simula busca de dados do pedido
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    setLoading(true);

    // Simula chamada de API
    setTimeout(() => {
      const mockData = {
        orderNumber: orderNumber,
        items: [
          {
            id: 1,
            name: "Need for Speed™ Most Wanted",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1262560/header.jpg?t=1605151411",
            quantity: 1,
            price: 550.00
          },
          {
            id: 2,
            name: "Forza Horizon 5",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg?t=1746471508",
            quantity: 2,
            price: 550.00
          },
          {
            id: 3,
            name: "DEVOUR",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1274570/9e87b6a67f6c72fc7a29cb91a36d901b5be45c3d/header_alt_assets_4.jpg?t=1760547195",
            quantity: 1,
            price: 350.00
          },
          {
            id: 4,
            name: "PEAK",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3527290/31bac6b2eccf09b368f5e95ce510bae2baf3cfcd/header.jpg?t=1759172507",
            quantity: 1,
            price: 800.00
          },
        ],
        total: 2800.00
      };

      setOrderData(mockData);
      setLoading(false);

      // Carrega avaliações existentes
      loadExistingRatings(mockData.items);
    }, 1000);
  };

  const loadExistingRatings = (items) => {
    const ratings = {};
    items.forEach(item => {
      const userRating = getUserRatingData(item.id);
      if (userRating) {
        ratings[item.id] = userRating.stars;
      }
    });
    setRatedProducts(ratings);
  };

  const handleRating = async (productId, productName, stars) => {
    const result = await rateProduct(productId, stars);

    if (result.success) {
      setRatedProducts(prev => ({
        ...prev,
        [productId]: stars
      }));

      showSuccess(
        "Obrigado pela sua avaliação!",
        `Sua avaliação de ${stars} estrela${stars > 1 ? 's' : ''} para ${productName} foi registrada com sucesso.`
      );
    } else {
      showError(
        "Erro ao avaliar",
        result.error || "Não foi possível registrar sua avaliação. Tente novamente."
      );
    }
  };

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  if (!fontLoaded) {
    return null;
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <PageHeader 
          onBackPress={() => navigation.goBack()} 
          title={`N Pedido ${orderNumber}`}
        />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando pedido...</Text>
        </View>
        <BottomTabBar 
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title={`N Pedido ${orderData.orderNumber}`}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lista de Itens */}
        <View style={styles.itemsContainer}>
          {orderData.items.map((item) => (
            <View key={item.id} style={styles.itemWrapper}>
              <RPGBorder
                widthPercent={0.90}
                height={184}
                tileSize={8}
                centerColor={COLORS.primary}
                borderType="black"
                contentPadding={12}
                contentJustify="center"
                contentAlign="center"
              >
                <View style={styles.orderItemContainer}>
                  {/* Parte superior: Imagem e Info do Produto */}
                  <View style={styles.productInfoRow}>
                    {/* Imagem do Produto */}
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.productImage}
                        resizeMode="stretch"
                      />
                    </View>

                    {/* Informações do Produto */}
                    <View style={styles.infoContainer}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text style={styles.quantity}>Qtd: {item.quantity}</Text>
                    </View>

                    {/* Preço */}
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>
                        R$ {parseFloat(item.price).toFixed(2).replace('.', ',')}
                      </Text>
                      <Text style={styles.subtotal}>
                        Subtotal: R$ {parseFloat(item.quantity * item.price).toFixed(2).replace('.', ',')}
                      </Text>
                    </View>
                  </View>

                  {/* Divisor */}
                  <View style={styles.divider} />

                  {/* Seção de Avaliação */}
                  <View style={styles.ratingSection}>
                    <Text style={styles.ratingLabel}>
                      {ratedProducts[item.id] ? "Sua Avaliação:" : "Avaliar:"}
                    </Text>
                    <View style={styles.ratingInputContainer}>
                      <StarRatingInput
                        initialRating={ratedProducts[item.id] || 0}
                        onRatingChange={(stars) => handleRating(item.id, item.name, stars)}
                        size={28}
                        disabled={false}
                        showLabel={false}
                      />
                    </View>
                  </View>
                </View>
              </RPGBorder>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Card de Total */}
        <View style={styles.totalContainer}>
          <TotalCard 
            total={orderData.total}
            borderType="blue"
            centerColor={COLORS.secondary}
          />
        </View>

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
  scrollContent: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  itemsContainer: {
    paddingBottom: 20,
  },
  itemWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  orderItemContainer: {
    width: '100%',
    gap: 10,
  },
  productInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  imageContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "VT323",
    marginBottom: 4,
  },
  quantity: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "VT323",
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  price: {
    color: "#FFD700",
    fontSize: 20,
    fontFamily: "VT323",
  },
  subtotal: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "VT323",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 8,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: 'VT323',
  },
  ratingInputContainer: {
    flexDirection: 'row',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 16,
    fontFamily: 'VT323',
  },
  totalContainer: {
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: '27%',
  },
});