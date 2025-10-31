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
  centerColor = COLORS.primary
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
        width={(width / 2) - 24} 
        height={221} 
        tileSize={8}
        centerColor={centerColor}
        borderType={borderType}
      >
        <ProductCard produto={item} onPress={null} />
      </RPGBorder>
    </TouchableOpacity>
  );

  return (
    <View style={styles.productsSection}>
      <Text style={styles.sectionTitle}>
        {searchText ? `Resultados (${produtos.length})` : 'Todos os Produtos'}
      </Text>
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
    
  },
  searchIcon: {
    width: 72,
    height: 72,
    tintColor: COLORS.inactive,
    resizeMode: 'contain',
  },
});