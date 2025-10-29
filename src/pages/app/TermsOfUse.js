import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTES
import PageHeader from "../../components/PageHeader";
import BottomTabBar from "../../components/BottomTabBar";
import RPGBorder from "../../components/RPGBorder";

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
};

export default function Terms({ navigation }) {
  const fontLoaded = useFontLoader();
  const [activeTab, setActiveTab] = useState('Notification');

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Notification");
    }, [])
  );

  const handleTabPress = (route, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Termos de uso" 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          <RPGBorder 
            width={340} 
            height="auto" 
            tileSize={10} 
            centerColor={COLORS.secondary}
            borderType="blue"
          >
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>
                Bem-vindo ao InsertCoin, plataforma online especializada na venda de jogos digitais, chaves de ativação ("keys") e conteúdos relacionados.
              </Text>

              <Text style={styles.welcomeText}>
                Ao acessar ou utilizar nosso site, você concorda com os presentes Termos de Uso. Recomendamos a leitura atenta de cada cláusula.
              </Text>

              <Text style={styles.sectionTitle}>1. Aceitação dos Termos</Text>
              <Text style={styles.paragraph}>
                Ao utilizar o site InsertCoin, você declara estar ciente e de acordo com nossa Política de Privacidade, bem como com os Termos de Uso.
              </Text>
              <Text style={styles.paragraph}>
                Se não concordar, solicitamos que não utilize a plataforma.
              </Text>

              <Text style={styles.sectionTitle}>2. Serviços Oferecidos</Text>
              <Text style={styles.paragraph}>
                • Venda de jogos digitais (keys para Steam, Epic, Origin, Xbox, PlayStation, etc.)
              </Text>
              <Text style={styles.paragraph}>
                • Distribuição de conteúdos digitais (expansões, DLCs, moedas virtuais)
              </Text>
              <Text style={styles.paragraph}>
                • Ofertas promocionais e descontos em títulos selecionados
              </Text>

              <Text style={styles.sectionTitle}>3. Cadastro de Usuário</Text>
              <Text style={styles.paragraph}>
                • É necessário criar uma conta. O usuário deve fornecer informações verdadeiras e completas.
              </Text>
              <Text style={styles.paragraph}>
                • É responsabilidade do usuário manter seus dados de login em sigilo.
              </Text>
            </View>
          </RPGBorder>
        </View>
      </ScrollView>

      <BottomTabBar 
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 120,
    paddingTop: 16,
  },
  contentWrapper: {
    alignItems: 'center',
  },
  textContainer: {
    padding: 20,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "VT323",
    lineHeight: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFD700",
    fontSize: 20,
    fontFamily: "VT323",
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    color: "#CCCCCC",
    fontSize: 14,
    fontFamily: "VT323",
    lineHeight: 18,
    marginBottom: 8,
  },
});