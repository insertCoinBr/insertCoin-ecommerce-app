import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Clipboard from 'expo-clipboard';
import RPGBorder from './RPGBorder';

const CARD_WIDTH = 360;
const CARD_HEIGHT = 400;

export default function IntegranteCard({ 
  integrante,
  borderType = "black",
  centerColor = "#4C38A4"
}) {
  const handleCopyRA = async (ra) => {
    try {
      await Clipboard.setStringAsync(ra);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível copiar o RA");
    }
  };

  return (
    <RPGBorder 
      width={CARD_WIDTH} 
      height={CARD_HEIGHT} 
      tileSize={16} 
      centerColor={centerColor}
      borderType={borderType}
    >
      <View style={styles.cardContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={integrante.image}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.nome}>{integrante.nome}</Text>
          <Text style={styles.funcao} numberOfLines={2}>
            {integrante.funcao}
          </Text>
        </View>

        {/* Email Button */}
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Linking.openURL(`mailto:${integrante.email}`)}
            activeOpacity={0.7}
          >
            <Icon name="email-outline" size={18} color="#ffffff" />
            <Text style={styles.buttonText}>EMAIL</Text>
          </TouchableOpacity>
        </View>

        {/* RA Button */}
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleCopyRA(integrante.ra)}
            activeOpacity={0.7}
          >
            <Icon name="identifier" size={18} color="#FFF" />
            <Text style={styles.buttonText}>{integrante.ra}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RPGBorder>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: "center",
    paddingTop: 5,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  nome: {
    fontSize: 32,
    fontFamily: "VT323",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 5,
  },
  funcao: {
    fontSize: 14,
    fontFamily: "VT323",
    color: "#ffffff",
    textAlign: "center",
    paddingHorizontal: 5,
    lineHeight: 16,
  },
  body: {
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#007BFF",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "VT323",
    color: "#ffffff",
    textAlign: "center",
    flex: 1,
  },
});