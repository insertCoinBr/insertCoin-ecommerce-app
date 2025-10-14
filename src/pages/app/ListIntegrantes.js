import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTES
import IntegranteCard from "../../components/IntegranteCard";
import AnimatedCardList from "../../components/AnimatedCardList";

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = Math.min(screenWidth - 40, 360);

// Mapeamento das imagens
const images = {
  'IconGui.png': require('../../../assets/InicialNomes/IconGui.png'),
  'IconAnderson.png': require('../../../assets/InicialNomes/IconAnderson.png'),
  'IconEdu.png': require('../../../assets/InicialNomes/IconEdu.png'),
  'IconLuis.png': require('../../../assets/InicialNomes/IconLuis.png'),
  'IconSalles.png': require('../../../assets/InicialNomes/IconSalles.png'),
};

// Dados dos integrantes
const integrantes = [
  {
    id: "1134330",
    nome: "Guilherme Ferrari",
    ra: "1134330",
    email: "guiferrari27@gmail.com",
    funcao: "Desenvolvedor Frontend / Designer UX/UI / Pixel Artist",
    image: images['IconGui.png'],
  },
  {
    id: "1134706",
    nome: "Anderson Bohnemberger",
    ra: "1134706",
    email: "bohnembergeranderson@gmail.com",
    funcao: "Desenvolvedor Backend / Engenheiro de Qualidade",
    image: images['IconAnderson.png'],
  },
  {
    id: "1134835",
    nome: "Eduardo Morel",
    ra: "1134835",
    email: "eduardo.morel.pessoal@gmail.com",
    funcao: "Analista de Requisitos / Desenvolvedor Backend",
    image: images['IconEdu.png'],
  },
  {
    id: "1134649",
    nome: "Luis Felipe Pagnussat",
    ra: "1134649",
    email: "luisfelipepagnussat55@gmail.com",
    funcao: "Desenvolvedor Frontend / Designer UX/UI",
    image: images['IconLuis.png'],
  },
  {
    id: "1133511",
    nome: "Cristiano Salles",
    ra: "1133511",
    email: "cristianosalles2011@gmail.com",
    funcao: "Desenvolvedor Backend / Engenheiro de Qualidade",
    image: images['IconSalles.png'],
  },
];

export default function ListIntegrantes() {
  const fontLoaded = useFontLoader();

  if (!fontLoaded) {
    return null;
  }

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <IntegranteCard integrante={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AnimatedCardList
          data={integrantes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1A1027",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  cardWrapper: {
    width: CARD_WIDTH,
    alignItems: "center",
  },
});