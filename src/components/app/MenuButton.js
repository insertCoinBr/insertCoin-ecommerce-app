import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import RPGBorder from './RPGBorder';

export default function MenuButton({ 
  title,
  onPress,
  img,
  borderType = "blue",
  centerColor = "#1F41BB",
  disabled = false
}) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={styles.wrapper}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <RPGBorder
        widthPercent={0.9}
        aspectRatio={0.18}
        tileSize={8}
        centerColor={disabled ? "#666666" : centerColor}
        borderType={borderType}
        contentPadding={8}
        contentJustify="center"
        contentAlign="center"
      >
        <View style={styles.container}>
          {img && (
            <Image 
              source={img} 
              style={styles.icon}
              resizeMode="contain"
            />
          )}
          <Text style={[styles.text, disabled && styles.textDisabled]}>
            {title}
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
    textAlign: 'center',
  },
  textDisabled: {
    color: "#AAAAAA",
  },
});