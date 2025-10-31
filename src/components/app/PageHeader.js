import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RPGBorder from "./RPGBorder";

const COLORS = {
  primary: "#1F41BB",
  background: "#1A1027",
  textLight: "#FFFFFF",
};

export default function PageHeader({ onBackPress, title }) {
  return (
    <View style={styles.header}>
      {/* Botão Voltar */}
      <RPGBorder
        width={100}
        height={55}
        centerColor={COLORS.primary}
        borderType="blue"
        tileSize={8}
      >
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButtonContainer}
          activeOpacity={0.8}
        >
          {/* <Icon name="chevron-left" size={22} color={COLORS.textLight} style={{ marginRight: 2 }} /> */}
          <Text style={styles.backButtonText}>VOLTAR</Text>
        </TouchableOpacity>
      </RPGBorder>

      {/* Título */}
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
   header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  backButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },

  backButtonText: {
    color: COLORS.textLight,
    fontSize: 18,
    fontFamily: "VT323",
    letterSpacing: 1,
  },

  title: {
    flex: 1,
    color: COLORS.textLight,
    fontSize: 28,
    fontFamily: "VT323",
    textAlign: "center",
    marginRight: 60,
  },
});