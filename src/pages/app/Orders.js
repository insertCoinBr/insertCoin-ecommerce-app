import React, { useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import FilterBar from "../../components/app/FilterBar";
import OrderCard from "../../components/app/OrderCard";

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
};

export default function Orders({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState("Orders");
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");

  // Dados de exemplo dos pedidos
  const pedidos = useMemo(() => [
    {
      id: 1,
      orderNumber: "123456-78901",
      status: "Processando",
      date: "15/01/24",
      total: "R$ 299,99",
    },
    {
      id: 2,
      orderNumber: "234567-89012",
      status: "Cancelado",
      date: "12/01/24",
      total: "R$ 149,99",
    },
    {
      id: 3,
      orderNumber: "345678-90123",
      status: "Entregue",
      date: "10/01/24",
      total: "R$ 499,99",
    },
    {
      id: 4,
      orderNumber: "456789-01234",
      status: "Processando",
      date: "18/01/24",
      total: "R$ 599,99",
    },
    {
      id: 5,
      orderNumber: "567890-12345",
      status: "Entregue",
      date: "05/01/24",
      total: "R$ 199,99",
    },
  ], []);

  // Atualiza a tab ativa quando entra na tela
  useFocusEffect(
    useCallback(() => {
      setActiveTab("Orders");
    }, [])
  );

  // Handler do filtro selecionado
  const handleFiltro = (filtro) => {
    setFiltroAtivo(filtro);
  };

  // Filtro dinâmico dos pedidos
  const pedidosFiltrados = useMemo(() => {
    if (filtroAtivo === "Todos") return pedidos;
    return pedidos.filter((p) => p.status === filtroAtivo);
  }, [filtroAtivo, pedidos]);

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  const handleOrderPress = (pedido) => {
    navigation.navigate("OrderDetails", {
      orderNumber: pedido.orderNumber,
      order: pedido, // Passa o objeto completo também
    });
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>

      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Meus Pedidos" 
      />

      {/* Barra de Filtros */}
        <FilterBar
          filtroAtivo={filtroAtivo}
          onFiltroPress={handleFiltro}
          filtros={["Todos", "Processando", "Entregue", "Cancelado"]}
        />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Lista de Pedidos */}
        <View style={styles.cardsContainer}>
          {pedidosFiltrados.length > 0 ? (
            pedidosFiltrados.map((pedido) => (
              <OrderCard
                key={pedido.id}
                orderNumber={pedido.orderNumber}
                status={pedido.status}
                date={pedido.date}
                total={pedido.total}
                onPress={() => handleOrderPress(pedido)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Nenhum pedido encontrado</Text>
              <Text style={styles.emptySubtitle}>
                Não há pedidos com status "{filtroAtivo}"
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  cardsContainer: {
    alignItems: "center",
    paddingVertical: 16,
    gap: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "VT323",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "#CCCCCC",
    fontSize: 18,
    fontFamily: "VT323",
    textAlign: "center",
  },
});