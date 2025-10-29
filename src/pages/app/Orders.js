import React, { useState, useCallback, useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import PageHeader from "../../components/PageHeader";
import BottomTabBar from "../../components/BottomTabBar";
import FilterBar from "../../components/FilterBar";
import OrderCard from "../../components/OrderCard";

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
  const pedidos = [
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
  ];

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

  // Filtro dinâmico dos pedidos — usa useMemo para evitar recomputar à toa
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
    });
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader onBackPress={() => navigation.goBack()} title="Meus Pedidos" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FilterBar
          filtroAtivo={filtroAtivo}
          onFiltroPress={handleFiltro}
          filtros={["Todos", "Processando", "Entregue", "Cancelado"]}
        />

        <View style={styles.cardsContainer}>
          {pedidosFiltrados.length > 0 ? (
            pedidosFiltrados.map((pedido) => (
              <OrderCard
                key={pedido.id}
                borderType="black"
                centerColor={COLORS.primary}
                orderNumber={pedido.orderNumber}
                status={pedido.status}
                date={pedido.date}
                total={pedido.total}
                onPress={() => handleOrderPress(pedido)}
              />
            ))
          ) : (
            <View style={{ padding: 20 }}>
              <PageHeader title="Nenhum pedido encontrado" />
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
    paddingBottom: 120,
  },
  cardsContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
});
