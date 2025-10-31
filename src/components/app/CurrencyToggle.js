import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RPGBorder from './RPGBorder';
import { CurrencyContext } from "./../../context/CurrencyContext";

export default function CurrencyToggle({
  onToggle, // opcional callback externo
  borderType = "black",
  centerColor = "#4C38A4"
}) {
  const { currency, setCurrency } = useContext(CurrencyContext);

  const handlePress = (value) => {
    setCurrency(value);
    if (typeof onToggle === 'function') onToggle(value);
  };

  return (
    <View style={styles.wrapper}>
      <RPGBorder
        width={338}
        height={55}
        tileSize={8}
        centerColor={centerColor}
        borderType={borderType}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.option,
              currency === 'BRL' && styles.optionActive
            ]}
            onPress={() => handlePress('BRL')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.optionText,
              currency === 'BRL' && styles.optionTextActive
            ]}>BRL</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={[
              styles.option,
              currency === 'USD' && styles.optionActive
            ]}
            onPress={() => handlePress('USD')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.optionText,
              currency === 'USD' && styles.optionTextActive
            ]}>USD</Text>
          </TouchableOpacity>
        </View>
      </RPGBorder>
    </View>
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
    justifyContent: 'space-around',
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: "#c4c4c4ff",
    fontSize: 18,
    fontFamily: "VT323",
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  optionTextActive: {
    color: "#FFD700",
    fontSize: 20,
  },
  divider: {
    width: 2,
    height: 30,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
});