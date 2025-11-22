import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import SearchHeader from '../../components/app/SearchHeader';
import CarouselDestaques from '../../components/app/CarouselDestaques';
import FilterBar from '../../components/app/FilterBar';
import ProductGrid from '../../components/app/ProductGrid';
import BottomTabBar from '../../components/app/BottomTabBar';
import FilterModal from '../../components/app/FilterModal';

// HOOKS
import useFontLoader from '../../hooks/useFontLoader';

// CONTEXTS
import { CurrencyContext } from "../../context/CurrencyContext";

// SERVIÇOS
import { getProducts } from "../../services/productService";

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
  const [filterBarY, setFilterBarY] = useState(0);

  // Estados para o modal de filtros
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterModalType, setFilterModalType] = useState(''); // 'Categoria' ou 'Plataforma'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const fontLoaded = useFontLoader();
  const scrollViewRef = useRef(null);

  // Pega a moeda atual
  const { currency } = useContext(CurrencyContext);

  useEffect(() => {
    fetchData();
  }, []);

  // Recarrega produtos quando a moeda mudar
  useEffect(() => {
    if (produtosList.length > 0) {
      fetchData();
    }
  }, [currency]);

  useFocusEffect(
      useCallback(() => {
        setActiveTab("Home");
      }, [])
    );

  // Extrai categorias únicas dos produtos (separando as que estão juntas por vírgula)
  const getUniqueCategories = () => {
    const allCategories = [];
    produtosList.forEach(item => {
      // Separa as categorias por vírgula e remove espaços extras
      const categories = item.category.split(',').map(cat => cat.trim());
      allCategories.push(...categories);
    });
    // Remove duplicatas e ordena
    return [...new Set(allCategories)].sort();
  };

  // Extrai plataformas únicas dos produtos
  const getUniquePlatforms = () => {
    const platforms = produtosList.map(item => item.platform);
    return [...new Set(platforms)].sort();
  };

  // Aplica filtros de busca, categoria e plataforma
  useEffect(() => {
    let filtered = [...produtosList];

    // Filtro de busca
    if (searchText.trim() !== '') {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtro de categoria - verifica se a categoria selecionada está contida no campo category
    if (selectedCategory) {
      filtered = filtered.filter(item => {
        const categories = item.category.split(',').map(cat => cat.trim());
        return categories.includes(selectedCategory);
      });
    }

    // Filtro de plataforma
    if (selectedPlatform) {
      filtered = filtered.filter(item => item.platform === selectedPlatform);
    }

    setFilteredList(filtered);
  }, [searchText, produtosList, selectedCategory, selectedPlatform]);

  async function fetchData() {
    setLoading(true);
    try {
      // Passa a moeda atual para a API
      const response = await getProducts(currency);

      // Adapta os dados da API para o formato do app
      const adaptedProducts = response.map(product => ({
        id: product.uuid || product.id,
        title: product.name || product.title,
        price: product.price,
        image: product.imageUrl || product.image,
        category: Array.isArray(product.category) ? product.category.join(', ') : product.category,
        platform: product.platform,
        description: product.description,
        avaliation: product.rating || product.avaliation || 0
      }));

      setProdutosList(adaptedProducts);
      setFilteredList(adaptedProducts);
      setDestaques(adaptedProducts.slice(0, 5));
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
    setLoading(false);
  }

  const handleFiltro = (filtro) => {
    // Se clicar em Categoria, sempre abre o modal
    if (filtro === 'Categoria') {
      setFilterModalType('Categoria');
      setShowFilterModal(true);
      return;
    }

    // Se clicar em Plataforma, sempre abre o modal
    if (filtro === 'Plataforma') {
      setFilterModalType('Plataforma');
      setShowFilterModal(true);
      return;
    }

    // Se clicar em Preço, ordena por preço
    if (filtro === 'Preco' && filtroAtivo === 'Preco') {
      const novaOrdem = precoOrdem === 'asc' ? 'desc' : 'asc';
      setPrecoOrdem(novaOrdem);

      let lista = [...filteredList];
      lista.sort((a, b) => novaOrdem === 'asc' ? a.price - b.price : b.price - a.price);
      setFilteredList(lista);
      return;
    }

    setFiltroAtivo(filtro);

    // Se clicar em Todos, limpa todos os filtros
    if (filtro === 'Todos') {
      setSelectedCategory(null);
      setSelectedPlatform(null);
      setPrecoOrdem('asc');
      return;
    }

    // Se clicar em Preço pela primeira vez
    if (filtro === 'Preco') {
      setPrecoOrdem('asc');
      let lista = [...filteredList];
      lista.sort((a, b) => a.price - b.price);
      setFilteredList(lista);
    }
  };

  // Função para lidar com a seleção de categoria no modal
  const handleSelectCategory = (category) => {
    // Se clicar na categoria já selecionada, remove a seleção
    if (category === selectedCategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    setShowFilterModal(false);
  };

  // Função para lidar com a seleção de plataforma no modal
  const handleSelectPlatform = (platform) => {
    // Se clicar na plataforma já selecionada, remove a seleção
    if (platform === selectedPlatform) {
      setSelectedPlatform(null);
    } else {
      setSelectedPlatform(platform);
    }
    setShowFilterModal(false);
  };

  const handleProductPress = (produto) => {
    navigation.navigate("ProductDetail", { produto });
  };

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  // Função para scroll quando clicar no campo de busca
  const handleSearchFocus = () => {
    if (filterBarY > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: filterBarY + 80, // abaixo do FilterBar
          animated: true,
        });
      }, 300); 
    }
  };

  // Captura a posição do FilterBar
  const handleFilterBarLayout = (event) => {
    const { y } = event.nativeEvent.layout;
    setFilterBarY(y);
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
        onSearchFocus={handleSearchFocus}
        onProfilePress={() => navigation.navigate("Profile")}
        placeholder="Buscar produtos..."
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        ref={scrollViewRef} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <CarouselDestaques 
          destaques={destaques}
          onItemPress={handleProductPress}
          borderType="black"
          centerColor={COLORS.primary}
        />

        <View onLayout={handleFilterBarLayout}>
          <FilterBar
            filtroAtivo={filtroAtivo}
            onFiltroPress={handleFiltro}
            precoOrdem={precoOrdem}
            selectedCategory={selectedCategory}
            selectedPlatform={selectedPlatform}
          />
        </View>

        <ProductGrid
          produtos={filteredList}
          onItemPress={handleProductPress}
          searchText={searchText}
          borderType="black"
          centerColor={COLORS.primary}
          activeFilters={{
            category: selectedCategory,
            platform: selectedPlatform
          }}
        />
      </ScrollView>

      {/* BOTTOM TAB BAR */}
      <BottomTabBar
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      {/* MODAL DE FILTROS */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onSelectFilter={filterModalType === 'Categoria' ? handleSelectCategory : handleSelectPlatform}
        filterType={filterModalType}
        options={filterModalType === 'Categoria' ? getUniqueCategories() : getUniquePlatforms()}
        selectedOption={filterModalType === 'Categoria' ? selectedCategory : selectedPlatform}
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
  scrollContent:{
    paddingBottom: 120,
  },
});