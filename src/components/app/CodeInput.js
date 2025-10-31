import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function CodeInput({ 
  length = 6, 
  value = [], 
  onChangeCode,
  autoFocus = true 
}) {
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...value];
    newCode[index] = text;
    onChangeCode(newCode);

    // Auto-avançar
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[styles.box, value[index] && styles.boxFilled]}
          maxLength={1}
          keyboardType="number-pad"
          value={value[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          autoFocus={autoFocus && index === 0}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  box: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#1F41BB',
    backgroundColor: '#F1F4FF',
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    color: '#1F41BB',
  },
  boxFilled: {
    borderColor: '#1F41BB',
    backgroundColor: '#E8EEFF',
  },
});