import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export default function useFontLoader() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      try {
        await Font.loadAsync({
          'VT323': require('../../assets/fonts/VT323-Regular.ttf'),
        });
        setFontLoaded(true);
      } catch (error) {
        console.error('Erro ao carregar fonte:', error);
        setFontLoaded(true); // Permite continuar mesmo com erro
      }
    }
    loadFont();
  }, []);

  return fontLoaded;
}