import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RPGBorder from './RPGBorder';

export default function FAQItem({ 
  question,
  answer,
  borderType = "blue",
  centerColor = "#1F41BB"
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity 
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.8}
      >
        <RPGBorder 
          width={345} 
          height={isExpanded ? 'auto' : 123} 
          tileSize={8} 
          centerColor={centerColor}
          borderType={borderType}
        >
          <View style={styles.container}>
            {/* Pergunta */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{question}</Text>
              <Icon 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#FFFFFF" 
              />
            </View>

            {/* Resposta (expandida) */}
            {isExpanded && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{answer}</Text>
              </View>
            )}
          </View>
        </RPGBorder>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 6,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  questionText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "VT323",
    paddingVertical: 0,
  },
  answerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  answerText: {
    color: "#CCCCCC",
    fontSize: 18,
    fontFamily: "VT323",
    lineHeight: 18,
  },
});