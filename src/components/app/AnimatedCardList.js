import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, View, StyleSheet } from 'react-native';

export default function AnimatedCardList({ 
  data, 
  renderItem,
  keyExtractor,
  style 
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedRenderItem = ({ item, index }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      {renderItem({ item, index })}
    </Animated.View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={animatedRenderItem}
      contentContainerStyle={[styles.listContent, style]}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  separator: {
    height: 20,
  },
});