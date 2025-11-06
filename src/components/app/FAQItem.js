import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RPGBorder from './RPGBorder';

// Habilita animações suaves no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function FAQItem({
  question,
  answer,
  borderType = "blue",
  centerColor = "#1F41BB"
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={toggleExpand} activeOpacity={0.8}>
        <RPGBorder
          width={345}
          height={isExpanded ? 221 : 123}
          tileSize={8}
          centerColor={centerColor}
          borderType={borderType}
          contentJustify="flex-start"
          contentAlign="flex-start"
        >
          <View style={styles.container}>
            {/* Pergunta */}
            <View style={styles.questionContainer}>
              <Text
                style={styles.questionText}
                numberOfLines={isExpanded ? 0 : 3}
                ellipsizeMode="tail"
              >
                {question}
              </Text>
              <Icon
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#FFFFFF"
              />
            </View>

            {/* Resposta */}
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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
  questionText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "VT323",
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
