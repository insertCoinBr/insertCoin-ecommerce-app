import React, { useState, useCallback, useMemo, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import BottomTabBar from "../../components/app/BottomTabBar";
import FilterBar from "../../components/app/FilterBar";
import OrderCard from "../../components/app/OrderCard";

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

// CONTEXTS
import { CurrencyContext } from "../../context/CurrencyContext";

// SERVICES
import { getUserOrders, getOrderById } from "../../services/orderService";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
};

export default function Orders({ navigation }) {
  const fontLoaded = useFontLoader();
  const { currency } = useContext(CurrencyContext);
  const [activeTab, setActiveTab] = useState("Orders");
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mapeia status da API para status exibido
  const mapStatus = (apiStatus) => {
    if (!apiStatus) return 'Desconhecido';
    
    // Converte para uppercase para comparação case-insensitive
    const normalizedStatus = String(apiStatus).toUpperCase().trim();
    
    switch (normalizedStatus) {
      case 'WAITING_PIX_PAYMENT':
        return 'Pagamento Pendente';
      case 'PENDING':
        return 'Confirmação pendente';
      case 'PAID':
        return 'Concluído';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        // Se não mapear, retorna o status original normalizado
        console.log('[Orders] Status não mapeado:', apiStatus);
        return apiStatus;
    }
  };

  // Busca pedidos da API
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      // Busca pedidos com a moeda atual
      const response = await getUserOrders({
        currency: currency,
        status: '',
        orderBy: 'createdAt',
        direction: 'desc'
      });

      // console.log('=== Pedidos recebidos da API ===');
      // console.log('Total de pedidos:', response.length);
      if (response.length > 0) {
        // console.log('Exemplo do primeiro pedido:', JSON.stringify(response[0], null, 2));
      }

      // Adapta os dados da API para o formato do componente
      const adaptedOrders = response.map(order => {
        // Formata a data
        const orderDate = new Date(order.createdAt);
        const formattedDate = orderDate.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        });

        // Formata o preço com símbolo da moeda
        const currencySymbol = currency === 'USD' ? '$' : 'R$';
        const totalValue = order.total || order.totalAmount || order.amount || 0;
        const formattedTotal = `${currencySymbol} ${totalValue.toLocaleString(currency === 'USD' ? 'en-US' : 'pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`;

        // Mapeia o status
        const mappedStatus = mapStatus(order.status);
        const orderId = order.uuid || order.id;

        return {
          id: orderId,
          orderNumber: order.orderNumber,
          status: mappedStatus,
          date: formattedDate,
          total: formattedTotal,
          rawData: order // Mantém dados originais para detalhes
        };
      });

      setPedidos(adaptedOrders);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  }, [currency]);

  // Carrega pedidos ao montar o componente
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Recarrega pedidos quando a moeda mudar
  useEffect(() => {
    if (pedidos.length > 0) {
      fetchOrders();
    }
  }, [currency]);

  // Atualiza a tab ativa quando entra na tela
  useFocusEffect(
    useCallback(() => {
      setActiveTab("Orders");
      fetchOrders(); // Recarrega pedidos ao voltar para a tela
    }, [fetchOrders])
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

  const handleOrderPress = async (pedido) => {
    try {
      // Busca os detalhes completos do pedido da API
      const orderDetails = await getOrderById(pedido.id, currency);

      navigation.navigate("OrderDetails", {
        orderNumber: pedido.orderNumber,
        order: orderDetails, // Passa os dados completos da API
      });
    } catch (error) {
      console.error('Erro ao buscar detalhes do pedido:', error);
      // Em caso de erro, navega com os dados que já temos
      navigation.navigate("OrderDetails", {
        orderNumber: pedido.orderNumber,
        order: pedido,
      });
    }
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
          filtros={["Todos", "Pagamento Pendente", "Confirmação pendente", "Concluído", "Cancelado"]}
        />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Loading */}
        {loading && pedidos.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Carregando pedidos...</Text>
          </View>
        ) : (
          /* Lista de Pedidos */
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
                  {filtroAtivo === "Todos"
                    ? "Você ainda não possui pedidos"
                    : `Não há pedidos com status "${filtroAtivo}"`
                  }
                </Text>
              </View>
            )}
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
    marginTop: 16,
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