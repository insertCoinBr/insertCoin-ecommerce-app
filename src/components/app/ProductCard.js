import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CurrencyContext } from "../../context/CurrencyContext";

// Paleta de cores para consistência com tema RPG
const COLORS = {
  white: '#FFFFFF',
  colorValue: '#3cff00ff',
  primary: '#4C38A4',
  textDark: '#212121',
  textMuted: '#9c9898ff',
  divider: '#E0E0E0',
};

export default function ProductCard({ produto}) {
  const { formatPrice } = useContext(CurrencyContext);
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: produto.image }}
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {produto.title}
        </Text>
        <Text style={styles.price}>
          {formatPrice(produto.price)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  contentContainer: {
    padding: 8,
    paddingTop: 4,
  },
  name: {
    fontFamily: "VT323",
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 6,
    minHeight: 36,
    lineHeight: 16,
  },
  price: {
    fontFamily: "VT323",
    fontSize: 20,
    color: COLORS.colorValue,
    marginBottom: 3,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});