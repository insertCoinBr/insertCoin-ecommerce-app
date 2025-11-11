import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * Componente de visualização de avaliação por estrelas (não-interativo)
 * Exibe a média de avaliação de um produto com estrelas douradas
 *
 * @param {number} rating - Avaliação média do produto (0-5)
 * @param {number} totalRatings - Total de avaliações recebidas
 * @param {number} size - Tamanho das estrelas em pixels (padrão: 16)
 * @param {boolean} showNumber - Se deve mostrar o número da avaliação (padrão: true)
 * @param {boolean} showTotal - Se deve mostrar o total de avaliações (padrão: false)
 * @param {string} starColor - Cor das estrelas preenchidas (padrão: #FFD700)
 * @param {string} emptyStarColor - Cor das estrelas vazias (padrão: #4A4A4A)
 */
export default function StarRating({
  rating = 0,
  totalRatings = 0,
  size = 16,
  showNumber = true,
  showTotal = false,
  starColor = "#FFD700",
  emptyStarColor = "#4A4A4A"
}) {
  // Garante que o rating está entre 0 e 5
  const normalizedRating = Math.max(0, Math.min(5, rating));

  // Renderiza as 5 estrelas
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= Math.round(normalizedRating);

      stars.push(
        <Text
          key={i}
          style={[
            styles.star,
            {
              fontSize: size,
              color: isFilled ? starColor : emptyStarColor
            }
          ]}
        >
          ★
        </Text>
      );
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>

      {showNumber && normalizedRating > 0 && (
        <Text style={[styles.ratingNumber, { fontSize: size }]}>
          ({normalizedRating.toFixed(1)})
        </Text>
      )}

      {showTotal && totalRatings > 0 && (
        <Text style={[styles.totalRatings, { fontSize: size - 2 }]}>
          {totalRatings} {totalRatings === 1 ? 'avaliação' : 'avaliações'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontFamily: 'Arial',
    lineHeight: 16,
  },
  ratingNumber: {
    color: "#FFFFFF",
    fontFamily: "VT323",
    marginLeft: 4,
  },
  totalRatings: {
    color: "#CCCCCC",
    fontFamily: "VT323",
    marginLeft: 4,
  },
});
