import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';
import RPGBorder from './RPGBorder';
import ProductCard from './ProductCard';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: "#4C38A4",
  textColors: "#FFFFFF",
  inactive: "#EAEAEA",
};

export default function ProductGrid({
  produtos,
  onItemPress,
  searchText = '',
  borderType = "black",
  centerColor = COLORS.primary,
  activeFilters = {} // { category: 'Ação', platform: 'Steam' }
}) {
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Image 
        source={require('../../../assets/IconsPixel/iconSearch.png')}
        style={styles.searchIcon}
      />
      <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onItemPress(item)}
      style={styles.productItemWrapper}
      activeOpacity={0.9}
    >
      <RPGBorder
        widthPercent={0.44}
        aspectRatio={1.25}
        tileSize={8}
        centerColor={centerColor}
        borderType={borderType}
        contentPadding={8}
        contentJustify="flex-start"
        contentAlign="stretch"
      >
        <ProductCard produto={item} onPress={null} />
      </RPGBorder>
    </TouchableOpacity>
  );

  // Gera o texto dos filtros ativos
  const getActiveFiltersText = () => {
    const filters = [];

    if (activeFilters.category) {
      filters.push(`Categoria: ${activeFilters.category}`);
    }

    if (activeFilters.platform) {
      filters.push(`Plataforma: ${activeFilters.platform}`);
    }

    if (filters.length === 0) {
      return null;
    }

    return filters.join(' • ');
  };

  const activeFiltersText = getActiveFiltersText();

  return (
    <View style={styles.productsSection}>
      <Text style={styles.sectionTitle}>
        {searchText ? `Resultados (${produtos.length})` : 'Todos os Produtos'}
      </Text>

      {/* Mostra filtros ativos */}
      {activeFiltersText && (
        <View style={styles.activeFiltersContainer}>
          <Text style={styles.activeFiltersLabel}>Filtros aplicados:</Text>
          <Text style={styles.activeFiltersText}>{activeFiltersText}</Text>
        </View>
      )}
      {produtos.length === 0 ? (
        renderEmpty()
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 8 }}
          columnWrapperStyle={styles.productRow}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  productsSection: {
    marginBottom: 75,
  },
  sectionTitle: {
    fontFamily: "VT323",
    fontSize: 32,
    color: COLORS.textColors,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  activeFiltersContainer: {
    backgroundColor: 'rgba(76, 56, 164, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#6ABE30',
  },
  activeFiltersLabel: {
    fontFamily: "VT323",
    fontSize: 18,
    color: '#6ABE30',
    marginBottom: 4,
  },
  activeFiltersText: {
    fontFamily: "VT323",
    fontSize: 22,
    color: COLORS.textColors,
    lineHeight: 24,
  },
  productItemWrapper: {
    marginBottom: 12,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: "VT323",
    fontSize: 24,
    color: COLORS.inactive,
    marginTop: 16,
  },
  searchIcon: {
    width: 72,
    height: 72,
    tintColor: COLORS.inactive,
    resizeMode: 'contain',
  },
});