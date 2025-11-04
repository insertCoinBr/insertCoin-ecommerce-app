import React from 'react';
import { View, Text, Pressable, StyleSheet,Dimensions } from 'react-native';
import RPGBorder from './RPGBorder';

export default function OrderCard({ 
  orderNumber = "XXXXXX-XXXXX",
  status = "Processando", 
  date = "DD/MM/AA",
  total = "R$ 0,00",
  onPress
}) {
  const getStatusColor = () => {
    switch (status) {
      case "Processando":
        return "#FFA600"; // laranja
      case "Cancelado":
        return "#FF4D4D"; // vermelho
      case "Entregue":
        return "#00C851"; // verde
      default:
        return "#FFF"; // branco padrão
    }
  };

  const { height, width } = Dimensions.get('window');

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <RPGBorder 
        width={345} 
        height="auto"
        tileSize={10} 
        centerColor={"#1F41BB"}
        borderType={"blue"}
      >
        <View style={styles.cardContent}>
          {/* Coluna Esquerda - Informações */}
          <View style={styles.leftColumn}>
            <Text style={styles.orderNumber}>N Pedido</Text>
            <Text style={styles.orderNumberValue}>{orderNumber}</Text>
            
            <View style={styles.statusRow}>
              <Text style={styles.label}>Status: </Text>
              <Text style={[styles.status, { color: getStatusColor() }]}>
                {status}
              </Text>
            </View>
            
            <Text style={styles.date}>Data Pedido {date}</Text>
          </View>

          {/* Coluna Direita - Total */}
          <View style={styles.rightColumn}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{total}</Text>
          </View>
        </View>
      </RPGBorder>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 8,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  leftColumn: {
    flex: 1,
  },
  orderNumber: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "VT323",
    marginBottom: 2,
  },
  orderNumberValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
    fontWeight: "bold",
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "VT323",
  },
  status: {
    fontSize: 16,
    fontFamily: "VT323",
    fontWeight: "bold",
  },
  date: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "VT323",
  },
  rightColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "VT323",
    marginBottom: 4,
  },
  totalValue: {
    color: "#FFD700",
    fontSize: 24,
    fontFamily: "VT323",
    fontWeight: "bold",
  },
});