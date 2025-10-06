import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function CustomButton({ 
  title, 
  onPress, 
  loading = false, 
  disabled = false,
  variant = 'primary', // 'primary' ou 'secondary'
  style, // ← ADICIONE ESTE PROP
  textStyle // ← ADICIONE ESTE PROP para customizar o texto também
}) {
  const buttonStyle = variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary;
  const defaultTextStyle = variant === 'primary' ? styles.textPrimary : styles.textSecondary;

  return (
    <TouchableOpacity
      style={[
        buttonStyle, 
        (disabled || loading) && styles.disabled,
        style // ← Aplica o estilo customizado por último para sobrescrever
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? '#fff' : '#1F41BB'} />
      ) : (
        <Text style={[defaultTextStyle, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonPrimary: { 
    marginTop: 20, 
    padding: 10, 
    backgroundColor: '#1F41BB', 
    borderRadius: 10,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSecondary: {
    marginTop: 10, 
    padding: 10,
    backgroundColor: 'transparent',
  },
  textPrimary: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textSecondary: {
    color: '#1F41BB',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.6,
  },
});