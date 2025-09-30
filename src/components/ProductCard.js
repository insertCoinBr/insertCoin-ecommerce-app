import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// Paleta de cores para consistência
const COLORS = {
  white: '#FFFFFF',
  primary: '#4C38A4',
  textDark: '#212121',
  textMuted: '#666666',
  border: '#F0F0F0',
};

export default function ProductCard({ produto, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: produto.image }} 
          style={styles.image} 
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={2}> 
          {produto.title}
        </Text>
        <Text style={styles.price}>R$ {produto.price.toFixed(2)}</Text>
        <Text style={styles.category}>{produto.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    margin: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 1,
    
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1, 
    padding: 10, 
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 8,
    minHeight: 38, 
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
});