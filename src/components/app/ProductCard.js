import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CurrencyContext } from "../../context/CurrencyContext";
import { RatingsContext } from "../../context/RatingsContext";
import StarRating from "./StarRating";

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
  const { getProductRatingData } = useContext(RatingsContext);
  const [rating, setRating] = useState({ averageRating: 0, totalRatings: 0 });

  useEffect(() => {
    loadRating();
  }, [produto.id]);

  const loadRating = async () => {
    const ratingData = await getProductRatingData(produto.id);

    // Se não houver avaliações no AsyncStorage, usa o campo avaliation do produto
    if (ratingData.totalRatings === 0 && produto.avaliation !== undefined) {
      setRating({
        averageRating: produto.avaliation,
        totalRatings: 1 // Simula que tem pelo menos 1 avaliação
      });
    } else {
      setRating(ratingData);
    }
  };

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
        <View style={styles.ratingContainer}>
          <StarRating
            rating={rating.averageRating}
            totalRatings={rating.totalRatings}
            size={12}
            showNumber={false}
            showTotal={false}
          />
        </View>
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
    backgroundColor: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  contentContainer: {
    padding: 6,
    paddingTop: 4,
  },
  name: {
    fontFamily: "VT323",
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 4,
    minHeight: 32,
    lineHeight: 16,
  },
  price: {
    fontFamily: "VT323",
    fontSize: 18,
    color: COLORS.colorValue,
    marginBottom: 2,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  ratingContainer: {
    marginTop: 2,
    marginBottom: 2,
  },
});