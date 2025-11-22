import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, View, LogBox } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

// Ignorar warnings específicos do expo-video
LogBox.ignoreLogs([
  'Cannot set prop',
  'shared object that was already released',
  'expo.modules.video.SurfaceVideoView',
]);

export default function Logo({ size = 'medium' }) {
  const dimensions = size === 'large'
    ? { width: 150, height: 179 }
    : { width: 119, height: 142 };

  const [hasError, setHasError] = useState(false);
  const isMounted = useRef(true);
  const playerRef = useRef(null);

  // Criar player de vídeo
  const player = useVideoPlayer(require('../../../assets/Moeda_Pixel_Art.mp4'), player => {
    if (isMounted.current) {
      playerRef.current = player;
      player.loop = false;
      player.muted = true;
      player.play();
    }
  });

  // Limpar player quando o componente desmontar
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
      // Não fazer nada no cleanup - deixar o expo-video gerenciar o ciclo de vida
      playerRef.current = null;
    };
  }, []);

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