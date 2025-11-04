import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Text,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import OrderItemCard from "../../components/app/OrderItemCard";
import TotalCard from "../../components/app/TotalCard";

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

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

  // Pega o número do pedido da navegação
  const { orderNumber } = route.params || { orderNumber: "XXXX-XXXX" };

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
    }, 1000);
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
            <OrderItemCard
              key={item.id}
              productImage={item.image}
              productName={item.name}
              quantity={item.quantity}
              price={item.price}
              borderType="black"
              centerColor={COLORS.primary}
            />
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
    paddingTop : 10,
    marginBottom: '27%',
  },
});