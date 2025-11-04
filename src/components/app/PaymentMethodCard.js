// src/components/PaymentMethodCard.js
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RPGBorder from './RPGBorder';

export default function PaymentMethodCard({ 
  title,
  icon,
  isSelected,
  onPress,
  borderType = "blue",
  centerColor = "#1F41BB"
}) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.wrapper}
      activeOpacity={0.8}
    >
      <RPGBorder 
        width={345} 
        height={75} 
        tileSize={8} 
        centerColor={isSelected ? centerColor : "#1F41BB"}
        borderType={isSelected ? borderType : "blue"}
        contentPadding={4}
        contentJustify="center"
        contentAlign="center"
      >
        <View style={styles.container}>
          {/* Ícone */}
          {icon && (
            <Image 
              source={icon} 
              style={styles.icon}
              resizeMode="contain"
            />
          )}

          {/* Título */}
          <Text style={styles.title}>{title}</Text>

          {/* Indicador de Seleção */}
          <View style={styles.radioContainer}>
            {isSelected && (
              <View style={styles.radioSelected} />
            )}
          </View>
        </View>
      </RPGBorder>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 6,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  icon: {
    width: 32,
    height: 32,
  },
  title: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
  },
  radioContainer: {
    width: 24,
    height: 24,
    
    borderWidth: 2,
    borderColor: "#FFFFFF",
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 12,
    height: 12,
    backgroundColor: "#FFD700",
  },
});