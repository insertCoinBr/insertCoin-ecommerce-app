import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RPGBorder from './RPGBorder';

export default function WishlistItemCard({ 
  product,
  onRemove,
  onAddToCart,
  borderType = "blue",
  centerColor = "#1F41BB"
}) {
  const formatPrice = (value) => {
    return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
  };

  return (
    <View style={styles.wrapper}>
      <RPGBorder 
        width={345} 
        height={80} 
        tileSize={8} 
        centerColor={centerColor}
        borderType={borderType}
      >
        <View style={styles.container}>
          {/* Imagem do Produto */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>

          {/* Informações do Produto */}
          <View style={styles.infoContainer}>
            <Text style={styles.productName} numberOfLines={2}>
              {product.title}
            </Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>

          {/* Ações */}
          <View style={styles.actionsContainer}>
            {/* Botão Adicionar ao Carrinho */}
            <TouchableOpacity 
              onPress={() => onAddToCart(product)}
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Icon name="cart-plus" size={24} color="#00FF00" />
            </TouchableOpacity>

            {/* Botão Remover */}
            <TouchableOpacity 
              onPress={() => onRemove(product.id)}
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Icon name="delete-outline" size={24} color="#ff4444" />
            </TouchableOpacity>
          </View>
        </View>
      </RPGBorder>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 6,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 12,
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
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
    fontSize: 20,
    fontFamily: "VT323",
    marginBottom: 4,
  },
  price: {
    color: "#FFD700",
    fontSize: 18,
    fontFamily: "VT323",
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});