import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import RPGBorder from './RPGBorder';

export default function OrderItemCard({ 
  productImage,
  productName,
  quantity,
  price,
  borderType = "black",
  centerColor = "#4C38A4"
}) {
  const formatPrice = (value) => {
    return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
  };

  return (
    <View style={styles.wrapper}>
      <RPGBorder 
        width={355} 
        height={101} 
        tileSize={8} 
        centerColor={centerColor}
        borderType={borderType}
      >
        <View style={styles.container}>
          {/* Imagem do Produto */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: productImage }}
              style={styles.productImage}
               resizeMode="stretch"
            />
          </View>

          {/* Informações do Produto */}
          <View style={styles.infoContainer}>
            <Text style={styles.productName} numberOfLines={2}>
              {productName}
            </Text>
            <Text style={styles.quantity}>Qtd: {quantity}</Text>
          </View>

          {/* Preço */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(price)}</Text>
            <Text style={styles.subtotal}>Subtotal: {formatPrice(quantity * price)}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
    fontFamily: "VT323",
    marginBottom: 4,
  },
  quantity: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "VT323",
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  price: {
    color: "#FFD700",
    fontSize: 20,
    fontFamily: "VT323",
    fontWeight: "bold",
  },
  subtotal: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "VT323",
    marginTop: 2,
  },
});