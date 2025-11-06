import React, { useRef, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import RPGBorder from './RPGBorder';

const { width } = Dimensions.get('window');
const CAROUSEL_ITEM_WIDTH = width - 60;

const COLORS = {
  primary: "#4C38A4",
  textColors: "#FFFFFF",
  inactive: "#EAEAEA",
  borderSelect: "#000000ff",
};

export default function CarouselDestaques({ 
  destaques, 
  onItemPress,
  borderType = "black",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CAROUSEL_ITEM_WIDTH - 60));
    setActiveIndex(Math.min(index, destaques.length - 1));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onItemPress(item)}
      activeOpacity={0.9}
      style={styles.carouselItemWrapper}
    >
      <RPGBorder
        width={CAROUSEL_ITEM_WIDTH - 61}
        height={241}
        tileSize={10}
        centerImage={{ uri: item.image }}
        imageResizeMode="stretch"
        borderType={borderType}
      >
    
      </RPGBorder>
    </TouchableOpacity>
  );

  if (!destaques || destaques.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Destaques</Text>
      
      <FlatList
        ref={carouselRef}
        data={destaques}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CAROUSEL_ITEM_WIDTH - 60}
        decelerationRate="fast"
        contentContainerStyle={styles.carouselList}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      
      {/* INDICADORES */}
      <View style={styles.indicatorContainer}>
        {destaques.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === activeIndex && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: "VT323",
    color: COLORS.textColors,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  carouselList: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  carouselItemWrapper: {
    marginRight: 15,
  },
  carouselItemContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    gap: 8,
  },
  indicator: {
    width: 12,
    height: 12,
    backgroundColor: COLORS.inactive,
  },
  indicatorActive: {
    width: 12,
    borderColor: COLORS.borderSelect,
    borderWidth: 1,
    backgroundColor: COLORS.primary,
  },
});