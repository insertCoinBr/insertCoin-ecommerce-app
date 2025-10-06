import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Logo({ size = 'medium' }) {
  const dimensions = size === 'large' 
    ? { width: 150, height: 179 } 
    : { width: 119, height: 142 };

  return (
    <Image 
      source={require('../../assets/InsertCoin.png')} 
      style={[styles.logo, dimensions]} 
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
  },
});