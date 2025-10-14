import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const COLORS = {
  primary: "#4C38A4",
  textColors: "#FFFFFF",
  textDark: "#333333",
  textLight: "#FFFFFF",
  inactive: "#EAEAEA",
  borderSelect: "#000000ff",
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
        {filtros.map((filtro) => (
          <TouchableOpacity
            key={filtro}
            style={[
              styles.filterButton,
              filtroAtivo === filtro && styles.filterButtonSelected,
            ]}
            onPress={() => onFiltroPress(filtro)}
          >
            <View style={styles.filterButtonContent}>
              <Text
                style={[
                  styles.filterText,
                  filtroAtivo === filtro && styles.filterTextSelected,
                ]}
              >
                {filtro === 'Preco' ? 'Preço' : filtro}
              </Text>
              {filtro === 'Preco' && filtroAtivo === 'Preco' && (
                <Icon 
                  name={precoOrdem === 'asc' ? 'arrow-up' : 'arrow-down'} 
                  size={16} 
                  color={COLORS.textLight}
                  style={{ marginLeft: 5 }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
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
  },
  filterButton: {
    backgroundColor: COLORS.inactive,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonSelected: {
    borderColor: COLORS.borderSelect,
    borderWidth: 1,
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.textDark,
    fontFamily: "VT323",
    fontSize: 18,
  },
  filterTextSelected: {
    color: COLORS.textLight,
    fontFamily: "VT323",
  },
});