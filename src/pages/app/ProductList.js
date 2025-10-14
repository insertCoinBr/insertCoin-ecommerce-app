import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTES
import SearchHeader from '../../components/SearchHeader';
import CarouselDestaques from '../../components/CarouselDestaques';
import FilterBar from '../../components/FilterBar';
import ProductGrid from '../../components/ProductGrid';
import BottomTabBar from '../../components/BottomTabBar';

// HOOKS
import useFontLoader from '../../hooks/useFontLoader';

// SERVIÇOS
import { getProdutosList } from "../../services/produtosService";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  textColors: "#FFFFFF",
};

export default function ProductList({ navigation }) {
  const [produtosList, setProdutosList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destaques, setDestaques] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const [precoOrdem, setPrecoOrdem] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('Home'); 

  const fontLoaded = useFontLoader();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredList(produtosList);
    } else {
      const filtered = produtosList.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [searchText, produtosList]);

  async function fetchData() {
    setLoading(true);
    const response = await getProdutosList();
    setProdutosList(response);
    setFilteredList(response);
    setDestaques(response.slice(0, 5));
    setLoading(false);
  }

  const handleFiltro = (filtro) => {
    if (filtro === 'Preco' && filtroAtivo === 'Preco') {
      const novaOrdem = precoOrdem === 'asc' ? 'desc' : 'asc';
      setPrecoOrdem(novaOrdem);
      
      let lista = [...produtosList];
      lista.sort((a, b) => novaOrdem === 'asc' ? a.price - b.price : b.price - a.price);
      setFilteredList(lista);
      return;
    }
    
    setFiltroAtivo(filtro);
    let lista = [...produtosList];
    
    switch(filtro) {
      case 'Preco':
        setPrecoOrdem('asc');
        lista.sort((a, b) => a.price - b.price);
        break;
      case 'Categoria':
        lista.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'Plataforma':
        lista.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'Todos':
      default:
        setPrecoOrdem('asc');
        break;
    }
    
    setFilteredList(lista);
  };

  const handleProductPress = (produto) => {
    navigation.navigate("ProductDetail", { produto });
  };

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  if (!fontLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={"large"} color={COLORS.primary} />
        <Text style={styles.loadingText}>Carregando recursos...</Text>
      </View>
    );
  }

  if (loading && produtosList.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        searchText={searchText}
        onSearchChange={setSearchText}
        onProfilePress={() => navigation.navigate("ListIntegrantes")}
        placeholder="Buscar produtos..."
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <CarouselDestaques 
          destaques={destaques}
          onItemPress={handleProductPress}
          borderType="black"
          centerColor={COLORS.primary}
        />

        <FilterBar 
          filtroAtivo={filtroAtivo}
          onFiltroPress={handleFiltro}
          precoOrdem={precoOrdem}
        />

        <ProductGrid 
          produtos={filteredList}
          onItemPress={handleProductPress}
          searchText={searchText}
          borderType="black"
          centerColor={COLORS.primary}
        />
      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <BottomTabBar 
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textColors,
    marginTop: 16,
    fontFamily: 'VT323',
  },
});