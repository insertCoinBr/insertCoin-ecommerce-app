import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: produto.image }} 
          style={styles.image} 
          //resizeMode="contain" //Mantém a proporção da imagem nao corta a imagem
          //resizeMode="cover" //Ocupa todo o espaço porem corta a imagem
          resizeMode="stretch" //Ocupa todo o espaço porem distorce a imagem
        />
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={2}> 
          {produto.title}
        </Text>
        <Text style={styles.price}>
  R$ {Number(produto.price || 0).toFixed(2)}
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
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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