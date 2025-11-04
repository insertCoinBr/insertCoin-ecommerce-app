import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import RPGBorder from './RPGBorder';

export default function TotalCard({ 
  total,
  borderType = "blue",
  centerColor = "#1F41BB"
}) {
  const formatPrice = (value) => {
    return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
  };

  const { height, width } = Dimensions.get('window');

  return (
    <View style={styles.wrapper}>
      <RPGBorder 
        width={width * 0.9} 
        height= {height * 0.1} 
        tileSize={8} 
        centerColor={centerColor}
        borderType={borderType}
        contentPadding={4}
        contentJustify="center"
        contentAlign="center"
      >
        <View style={styles.container}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>
      </RPGBorder>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom:"5%",
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "VT323",
    
  },
  totalValue: {
    color: "#FFD700",
    fontSize: 32,
    fontFamily: "VT323",
   
  },
});