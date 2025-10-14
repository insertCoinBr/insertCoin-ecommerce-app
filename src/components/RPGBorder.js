import React from "react";
import { View, Image, StyleSheet } from "react-native";

// Mapeamento das bordas
const BORDER_IMAGES = {
  black: {
    topLeft: require("../../assets/Bordas/topLeft.png"),
    topMid: require("../../assets/Bordas/topMid.png"),
    topRight: require("../../assets/Bordas/topRight.png"),
    midLeft: require("../../assets/Bordas/midLeft.png"),
    midRight: require("../../assets/Bordas/midRight.png"),
    botLeft: require("../../assets/Bordas/botLeft.png"),
    botMid: require("../../assets/Bordas/botMid.png"),
    botRight: require("../../assets/Bordas/botRight.png"),
  },
  white: {
    topLeft: require("../../assets/Bordas/topLeftWhite.png"),
    topMid: require("../../assets/Bordas/topMidWhite.png"),
    topRight: require("../../assets/Bordas/topRightWhite.png"),
    midLeft: require("../../assets/Bordas/midLeftWhite.png"),
    midRight: require("../../assets/Bordas/midRightWhite.png"),
    botLeft: require("../../assets/Bordas/botLeftWhite.png"),
    botMid: require("../../assets/Bordas/botMidWhite.png"),
    botRight: require("../../assets/Bordas/botRightWhite.png"),
  },
  fine: {
    topLeft: require("../../assets/Bordas/topLeftL.png"),
    topMid: require("../../assets/Bordas/topMidL.png"),
    topRight: require("../../assets/Bordas/topRightL.png"),
    midLeft: require("../../assets/Bordas/midLeftL.png"),
    midRight: require("../../assets/Bordas/midRightL.png"),
    botLeft: require("../../assets/Bordas/botLeftL.png"),
    botMid: require("../../assets/Bordas/botMidL.png"),
    botRight: require("../../assets/Bordas/botRightL.png"),
  },
};

export default function RPGBorder({
  width = 260,
  height = 120,
  children,
  tileSize = 16,
  centerColor = "#1a1a1a",
  borderType = "black", // Padrão é black
}) {
  const centerWidth = Math.max(0, width - tileSize * 2);
  const centerHeight = Math.max(0, height - tileSize * 2);

  // Seleciona o conjunto de bordas baseado no borderType
  const borders = BORDER_IMAGES[borderType] || BORDER_IMAGES.black;

  return (
    <View style={[styles.wrapper, { width, height }]}>
      {/* Top row */}
      <View style={[styles.row, { height: tileSize }]}>
        <Image
          source={borders.topLeft}
          style={{ width: tileSize, height: tileSize }}
          resizeMode="stretch"
        />

        <Image
          source={borders.topMid}
          style={{ width: centerWidth, height: tileSize }}
          resizeMode="stretch"
        />

        <Image
          source={borders.topRight}
          style={{ width: tileSize, height: tileSize }}
          resizeMode="stretch"
        />
      </View>

      {/* Middle row */}
      <View style={[styles.row, { height: centerHeight }]}>
        <Image
          source={borders.midLeft}
          style={{ width: tileSize, height: centerHeight }}
          resizeMode="stretch"
        />

        <View
          style={{
            width: centerWidth,
            height: centerHeight,
            backgroundColor: centerColor,
          }}
        >
          {/* Conteúdo central com padding */}
          <View style={{ 
            flex: 1,
            padding: tileSize,
            justifyContent: 'space-between',
          }}>
            {children}
          </View>
        </View>

        <Image
          source={borders.midRight}
          style={{ width: tileSize, height: centerHeight }}
          resizeMode="stretch"
        />
      </View>

      {/* Bottom row */}
      <View style={[styles.row, { height: tileSize }]}>
        <Image
          source={borders.botLeft}
          style={{ width: tileSize, height: tileSize }}
          resizeMode="stretch"
        />

        <Image
          source={borders.botMid}
          style={{ width: centerWidth, height: tileSize }}
          resizeMode="stretch"
        />

        <Image
          source={borders.botRight}
          style={{ width: tileSize, height: tileSize }}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
  },
});