// src/components/CartItemCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RPGBorder from './RPGBorder';

export default function CartItemCard({ 
  product,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
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
        height={104} 
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

          {/* Controles de Quantidade */}
          <View style={styles.controls}>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                onPress={onDecrement}
                style={styles.controlButton}
                activeOpacity={0.7}
              >
                <Icon name="minus" size={16} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>
                  {quantity.toString().padStart(2, '0')}
                </Text>
              </View>

              <TouchableOpacity 
                onPress={onIncrement}
                style={styles.controlButton}
                activeOpacity={0.7}
              >
                <Icon name="plus" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Botão Remover */}
            <TouchableOpacity 
              onPress={onRemove}
              style={styles.removeButton}
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
    lineHeight: 16,
  },
  price: {
    color: "#FFD700",
    fontSize: 20,
    fontFamily: "VT323",
  },
  controls: {
    alignItems: 'center',
    gap: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  controlButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 14,
  },
  quantityDisplay: {
    paddingHorizontal: 12,
  },
  quantityText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "VT323",
    fontWeight: "bold",
  },
  removeButton: {
    padding: 4,
  },
});