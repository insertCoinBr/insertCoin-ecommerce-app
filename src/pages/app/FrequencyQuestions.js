import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import FAQItem from "../../components/app/FAQItem";

// HOOKS
import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
};

export default function FAQ({ navigation }) {
  const fontLoaded = useFontLoader();

  const faqData = [
    {
      id: 1,
      question: "1. O que é a InsertCoin?",
      answer: "A InsertCoin é uma loja digital especializada na venda de jogos digitais em diversos formatos como Jogos ('keys') para diversas plataformas como Steam, Epic Games, Origin, Xbox e PlayStation."
    },
    {
      id: 2,
      question: "2. Quais formas de pagamento são aceitas?",
      answer: "Aceitamos cartão de crédito, Pix, e outros métodos poderão ser adicionados futuramente."
    },
    {
      id: 3,
      question: "3. Quanto tempo leva para receber minha key após a compra?",
      answer: "Na maioria dos casos, a entrega é imediata, logo após a confirmação do pagamento."
    },
    {
      id: 4,
      question: "4. Há restrições específicas (Como análise antifraude), pode levar até 24 horas.",
      answer: "Alguns jogos podem ter restrição regional. Verifique a descrição do produto antes de comprar."
    },
    {
      id: 5,
      question: "5. Como eu recebo o jogo comprado?",
      answer: "Você receberá a chave digital (key) em seu e-mail cadastrado ou diretamente em sua conta no site. Basta acessar a plataforma correspondente (Steam, Epic, Xbox, etc.)."
    },
    {
      id: 6,
      question: "6. As keys funcionam em qualquer país?",
      answer: "Alguns jogos podem ter restrição regional. Sempre verifique a descrição do produto."
    },
  ];

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Perguntas Frequentes" 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {faqData.map((faq) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            borderType="blue"
            centerColor={COLORS.secondary}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 180,
    paddingTop: 16,
  },
});