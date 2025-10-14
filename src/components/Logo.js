import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';


export default function Logo({ size = 'medium' }) {
  const dimensions = size === 'large' 
    ? { width: 150, height: 179 } 
    : { width: 119, height: 142 };

  const [loaded, setLoaded] = useState(false);

  return (
    <View style={dimensions}>
      {!loaded && (
        <Image
          source={require('../../assets/LogoInsetCoin1.png')}
          style={[styles.logo, dimensions]}
        />
      )}
      <Video
        source={require('../../assets/Moeda_Pixel_Art.mp4')}
        style={[styles.logo, dimensions, { position: 'absolute', top: 0, left: 0 }]}
        resizeMode="contain"
        isLooping={false} 
        shouldPlay
        isMuted
        onLoad={() => setLoaded(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: '100%',
  },
});