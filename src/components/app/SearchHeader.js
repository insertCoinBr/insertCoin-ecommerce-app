import React, { useRef } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import RPGBorder from './RPGBorder';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Calcula altura baseada no tamanho da tela, mas com limites
const getSearchHeight = () => {
  const calculatedHeight = screenHeight * 0.065;
  // Garante que fique entre 48 e 64 pixels
  return Math.max(48, Math.min(64, calculatedHeight));
};

const COLORS = {
  primary: '#4C38A4',
  background: '#1A1027',
  cardBg: '#FFFFFF',
  textDark: '#333333',
  text: '#999',
};

const SEARCH_HEIGHT = getSearchHeight();

export default function SearchHeader({ 
  searchText, 
  onSearchChange, 
  onProfilePress,
  onSearchFocus,
  placeholder = "Buscar produtos...",
  showProfile = true,
  style
}) {
  const searchWidth = showProfile ? screenWidth - 100 : screenWidth - 32;
  const inputRef = useRef(null);

  return (
    <View style={[styles.header, style]}>
      {/* BARRA DE PESQUISA COM RPGBORDER */}
      <RPGBorder 
        width={searchWidth} 
        height={SEARCH_HEIGHT} 
        tileSize={8}
        centerColor={COLORS.cardBg}
        borderType="white"
      >
        <View style={styles.searchContent}>
          <Image 
            source={require('../../../assets/IconsPixel/iconSearch.png')}
            style={styles.searchIcon}
          />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={COLORS.text}
            value={searchText}
            onChangeText={onSearchChange}
            onFocus={onSearchFocus}
          />
        </View>
      </RPGBorder>
      
      {/* BOTÃO DE PERFIL SEM BORDA */}
      {showProfile && (
        <TouchableOpacity 
          onPress={onProfilePress}
          activeOpacity={0.7}
          style={styles.profileButton}
        >
          <Image
            source={require('../../../assets/IconsPixel/iconUser.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "transparent",
    gap: 12,
  },
  searchContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
    paddingVertical: 0,
    height: '100%',
  },
  profileButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});