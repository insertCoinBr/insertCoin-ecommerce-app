import React, { useState } from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet } from 'react-native';
import RPGBorder from './RPGBorder';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width - 32;

export default function ImageCarousel({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / IMAGE_WIDTH);
    setActiveIndex(Math.min(index, images.length - 1));
  };

  // Se não houver imagens ou for array vazio, usa uma imagem padrão
  const displayImages = images.length > 0 ? images : [images];

  return (
    <View style={styles.container}>
      <RPGBorder
        width={IMAGE_WIDTH}
        height={240}
        tileSize={10}
        centerColor="#1A1027"
        borderType="black"
      >
        <FlatList
          data={displayImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        />
      </RPGBorder>

      {/* Indicadores */}
      {displayImages.length > 1 && (
        <View style={styles.indicatorContainer}>
          {displayImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === activeIndex && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    width: IMAGE_WIDTH - 20,
    height: 220,
    
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    backgroundColor: '#666666',
  },
  indicatorActive: {
    width: 10,
    height: 10,
    backgroundColor: '#4C38A4',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
});