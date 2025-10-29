import React from "react";
import { View, Image, StyleSheet } from "react-native";


// Mapeamento das bordas
const BORDER_IMAGES = {
  black: {
    topLeft: require("../../assets/Bordas/black/topLeft.png"),
    topMid: require("../../assets/Bordas/black/topMid.png"),
    topRight: require("../../assets/Bordas/black/topRight.png"),
    midLeft: require("../../assets/Bordas/black/midLeft.png"),
    midRight: require("../../assets/Bordas/black/midRight.png"),
    botLeft: require("../../assets/Bordas/black/botLeft.png"),
    botMid: require("../../assets/Bordas/black/botMid.png"),
    botRight: require("../../assets/Bordas/black/botRight.png"),
  },
  white: {
    topLeft: require("../../assets/Bordas/white/topLeftWhite.png"),
    topMid: require("../../assets/Bordas/white/topMidWhite.png"),
    topRight: require("../../assets/Bordas/white/topRightWhite.png"),
    midLeft: require("../../assets/Bordas/white/midLeftWhite.png"),
    midRight: require("../../assets/Bordas/white/midRightWhite.png"),
    botLeft: require("../../assets/Bordas/white/botLeftWhite.png"),
    botMid: require("../../assets/Bordas/white/botMidWhite.png"),
    botRight: require("../../assets/Bordas/white/botRightWhite.png"),
  },
  fine: {
    topLeft: require("../../assets/Bordas/fine/topLeftFine.png"),
    topMid: require("../../assets/Bordas/fine/topMidFine.png"),
    topRight: require("../../assets/Bordas/fine/topRightFine.png"),
    midLeft: require("../../assets/Bordas/fine/midLeftFine.png"),
    midRight: require("../../assets/Bordas/fine/midRightFine.png"),
    botLeft: require("../../assets/Bordas/fine/botLeftFine.png"),
    botMid: require("../../assets/Bordas/fine/botMidFine.png"),
    botRight: require("../../assets/Bordas/fine/botRightFine.png"),
  },
  blue: {
    topLeft: require("../../assets/Bordas/blue/topLeftBlue.png"),
    topMid: require("../../assets/Bordas/blue/topMidBlue.png"),
    topRight: require("../../assets/Bordas/blue/topRightBlue.png"),
    midLeft: require("../../assets/Bordas/blue/midLeftBlue.png"),
    midRight: require("../../assets/Bordas/blue/midRightBlue.png"),
    botLeft: require("../../assets/Bordas/blue/botLeftBlue.png"),
    botMid: require("../../assets/Bordas/blue/botMidBlue.png"),
    botRight: require("../../assets/Bordas/blue/botRightBlue.png"),
  },
  green: {
    topLeft: require("../../assets/Bordas/green/topLeftGreen.png"),
    topMid: require("../../assets/Bordas/green/topMidGreen.png"),
    topRight: require("../../assets/Bordas/green/topRightGreen.png"),
    midLeft: require("../../assets/Bordas/green/midLeftGreen.png"),
    midRight: require("../../assets/Bordas/green/midRightGreen.png"),
    botLeft: require("../../assets/Bordas/green/botLeftGreen.png"),
    botMid: require("../../assets/Bordas/green/botMidGreen.png"),
    botRight: require("../../assets/Bordas/green/botRightGreen.png"),
  },
  red: {
    topLeft: require("../../assets/Bordas/red/topLeftRed.png"),
    topMid: require("../../assets/Bordas/red/topMidRed.png"),
    topRight: require("../../assets/Bordas/red/topRightRed.png"),
    midLeft: require("../../assets/Bordas/red/midLeftRed.png"),
    midRight: require("../../assets/Bordas/red/midRightRed.png"),
    botLeft: require("../../assets/Bordas/red/botLeftRed.png"),
    botMid: require("../../assets/Bordas/red/botMidRed.png"),
    botRight: require("../../assets/Bordas/red/botRightRed.png"),
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