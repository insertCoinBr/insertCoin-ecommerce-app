import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RPGBorder from './RPGBorder';
import { CurrencyContext } from '../../context/CurrencyContext';

export default function WishlistItemCard({
  product,
  onRemove,
  onAddToCart,
  borderType = "blue",
  centerColor = "#1F41BB"
}) {
  const { formatPrice } = useContext(CurrencyContext);

  return (
    <View style={styles.wrapper}>
      <RPGBorder
        widthPercent={0.91}
        aspectRatio={0.35}
        tileSize={8}
        centerColor={centerColor}
        borderType={borderType}
        contentPadding={8}
        contentJustify="center"
        contentAlign="center"
      >
        <View style={styles.container}>
          {/* Imagem do Produto */}
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="stretch"
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
    gap: 12,
  },
  imageWrapper: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4C38A4',
    borderRadius: 8,
    overflow: 'hidden',
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
    fontSize: 18,
    fontFamily: "VT323",
    marginBottom: 4,
    lineHeight: 18,
  },
  price: {
    color: "#FFD700",
    fontSize: 20,
    fontFamily: "VT323",
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
});