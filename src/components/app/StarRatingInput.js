import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

/**
 * Componente interativo de avaliação por estrelas
 * Permite ao usuário selecionar uma nota de 1 a 5 estrelas
 *
 * @param {number} initialRating - Avaliação inicial (padrão: 0)
 * @param {function} onRatingChange - Callback quando a avaliação muda
 * @param {number} size - Tamanho das estrelas em pixels (padrão: 32)
 * @param {boolean} disabled - Se o componente está desabilitado (padrão: false)
 * @param {boolean} showLabel - Se deve mostrar o texto descritivo (padrão: true)
 * @param {string} starColor - Cor das estrelas preenchidas (padrão: #FFD700)
 * @param {string} emptyStarColor - Cor das estrelas vazias (padrão: #4A4A4A)
 */
export default function StarRatingInput({
  initialRating = 0,
  onRatingChange,
  size = 32,
  disabled = false,
  showLabel = true,
  starColor = "#FFD700",
  emptyStarColor = "#4A4A4A"
}) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [scaleAnims] = useState([...Array(5)].map(() => new Animated.Value(1)));

  const handleStarPress = (value) => {
    if (disabled) return;

    setRating(value);

    // Animação de escala ao selecionar
    Animated.sequence([
      Animated.timing(scaleAnims[value - 1], {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[value - 1], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleStarPressIn = (value) => {
    if (disabled) return;
    setHoverRating(value);
  };

  const handleStarPressOut = () => {
    if (disabled) return;
    setHoverRating(0);
  };

  // Renderiza as 5 estrelas interativas
  const renderStars = () => {
    const stars = [];
    const displayRating = hoverRating || rating;

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= displayRating;
      const isHovered = hoverRating > 0 && i <= hoverRating;

      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          onPressIn={() => handleStarPressIn(i)}
          onPressOut={handleStarPressOut}
          disabled={disabled}
          activeOpacity={0.7}
          style={styles.starButton}
        >
          <Animated.Text
            style={[
              styles.star,
              {
                fontSize: size,
                color: isFilled ? starColor : emptyStarColor,
                opacity: disabled ? 0.5 : isHovered ? 0.8 : 1,
                transform: [{ scale: scaleAnims[i - 1] }],
              }
            ]}
          >
            ★
          </Animated.Text>
        </TouchableOpacity>
      );
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>

      {showLabel && rating > 0 && (
        <Text style={[styles.ratingLabel, { fontSize: size * 0.5 }]}>
          {rating === 1 && "Ruim"}
          {rating === 2 && "Pode Melhorar"}
          {rating === 3 && "Bom"}
          {rating === 4 && "Muito Bom"}
          {rating === 5 && "Excelente"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  starButton: {
    padding: 4,
  },
  star: {
    fontFamily: 'Arial',
  },
  ratingLabel: {
    color: "#FFD700",
    fontFamily: "VT323",
    textAlign: 'center',
  },
});
