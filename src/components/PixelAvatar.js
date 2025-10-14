import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function PixelAvatar({ 
  source, 
  size = 100,
  style 
}) {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image
        source={source}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});