import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RPGBorder from './RPGBorder';

const COLORS = {
  primary: "#4C38A4",
  secondary: "#1F41BB",
  textColors: "#FFFFFF",
  textDark: "#333333",
  textLight: "#FFFFFF",
  inactive: "#FFFFFF",
};

export default function FilterBar({ 
  filtroAtivo, 
  onFiltroPress, 
  precoOrdem,
  filtros = ['Todos', 'Preco', 'Categoria', 'Plataforma']
}) {
  return (
    <View style={styles.filterSection}>
      <Text style={styles.sectionTitle}>Filtros</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filtros.map((filtro) => {
          const isActive = filtroAtivo === filtro;
          
          // Define largura baseada no tamanho do texto
          let buttonWidth = 110;
          if (filtro === 'Categoria' || filtro === 'Plataforma' || filtro === 'Processando' || filtro === 'Cancelado') {
            buttonWidth = 142;
          } else if (filtro === 'Entregue') {
            buttonWidth = 120;
          }
          
          return (
            <TouchableOpacity
              key={filtro}
              onPress={() => onFiltroPress(filtro)}
              activeOpacity={0.8}
              style={styles.filterButtonWrapper}
            >
              <RPGBorder
                width={buttonWidth}
                height={50}
                tileSize={8}
                centerColor={isActive ? COLORS.secondary : COLORS.inactive}
                borderType={isActive ? "blue" : "white"}
                contentPadding={4}
                contentJustify="center"
                contentAlign="center"
              >
                <View style={styles.filterButtonContent}>
                  <Text
                    style={[
                      styles.filterText,
                      isActive && styles.filterTextSelected,
                    ]}
                    numberOfLines={1}
                  >
                    {filtro === 'Preco' ? 'Preço' : filtro}
                  </Text>
                  {filtro === 'Preco' && isActive && (
                    <Icon 
                      name={precoOrdem === 'asc' ? 'arrow-up' : 'arrow-down'} 
                      size={16} 
                      color={COLORS.textLight}
                      style={styles.priceIcon}
                    />
                  )}
                </View>
              </RPGBorder>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterSection: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: "VT323",
    color: COLORS.textColors,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  filterButtonWrapper: {
    marginRight: 10,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    color: COLORS.textDark,
    fontFamily: "VT323",
    fontSize: 18,
    textAlign: 'center',
  },
  filterTextSelected: {
    color: COLORS.textLight,
  },
  priceIcon: {
    marginLeft: 4,
  },
});