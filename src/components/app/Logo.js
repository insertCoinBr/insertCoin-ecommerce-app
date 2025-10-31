import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

export default function Logo({ size = 'medium' }) {
  const dimensions = size === 'large' 
    ? { width: 150, height: 179 } 
    : { width: 119, height: 142 };

  const [hasError, setHasError] = useState(false);
  
  // Criar player de vídeo
  const player = useVideoPlayer(require('../../../assets/Moeda_Pixel_Art.mp4'), player => {
    player.loop = false;
    player.muted = true;
    player.play();
  });

  // Se der erro, mostra a imagem
  if (hasError) {
    return (
      <View style={dimensions}>
        <Image
          source={require('../../../assets/LogoInsetCoin1.png')}
          style={[styles.logo, dimensions]}
        />
      </View>
    );
  }

  // Por padrão, mostra o vídeo
  return (
    <View style={dimensions}>
      <VideoView
        player={player}
        style={[styles.logo, dimensions]}
        contentFit="contain"
        nativeControls={false}
        onError={() => setHasError(true)}
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