// src/components/SearchHeader.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RPGBorder from './RPGBorder';

const { width: screenWidth } = Dimensions.get('window');

const COLORS = {
  primary: '#190b5cff',
  background: '#1A1027',
  cardBg: '#FFFFFF',
  textDark: '#333333',
  shadow: '#000',
};

export default function SearchHeader({ 
  searchText, 
  onSearchChange, 
  onProfilePress,
  placeholder = "Buscar produtos...",
  showProfile = true,
  style
}) {
  const searchWidth = showProfile ? screenWidth - 100 : screenWidth - 32;

  return (
    <View style={[styles.header, style]}>

      {/* BARRA DE PESQUISA */}
      <RPGBorder 
        width={searchWidth} 
        height={50} 
        tileSize={8}
        centerColor={COLORS.cardBg}
        borderType="white" // Padrão é black
      >
        <View style={styles.searchContent}>
          <Image 
            source={require('../../assets/IconsPixel/iconSearch.png')}
            style={styles.searchIcon}

          />
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={onSearchChange}
            id='Pesquisa'
          />
          
        </View>
      </RPGBorder>
      
      {/* BOTÃO DE PERFIL */}
      {showProfile && (
        <TouchableOpacity 
          onPress={onProfilePress}
          activeOpacity={0.7}
          style={styles.profileButton}
          id='Perfil'
        >
          <Image
            source={require('../../assets/IconsPixel/iconUser.png')}
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
    backgroundColor: COLORS.background,
    gap: 12,
  },
  // CONTEÚDO DA BARRA DE PESQUISA
  searchContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  searchIcon: {
    width: 32,
    height: 32,
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
  clearButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // BOTÃO DE PERFIL
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