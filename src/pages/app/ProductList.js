import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from "../../components/ProductCard";
import { getProdutosList } from "../../services/produtosService";

// PALETA DE CORES
const COLORS = {
  background: "#F7F8FA",
  primary: "#4C38A4",
  textDark: "#333333",
  textLight: "#FFFFFF",
  inactive: "#EAEAEA",
};

export default function ProductList({ navigation }) {
  const [produtosList, setProdutosList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const response = await getProdutosList();
    setProdutosList(response);
    setFilteredList(response);
    const categoriasUnicas = [
      ...new Set(response.map((produto) => produto.category)),
    ];
    setCategorias(categoriasUnicas);
    setLoading(false);
  }

  useEffect(() => {
    if (categoriaSelecionada) {
      setFilteredList(
        produtosList.filter((produto) => produto.category === categoriaSelecionada)
      );
    } else {
      setFilteredList(produtosList);
    }
  }, [categoriaSelecionada, produtosList]);

  if (loading && produtosList.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              !categoriaSelecionada && styles.filterButtonSelected,
            ]}
            onPress={() => setCategoriaSelecionada(null)}
          >
            <Text
              style={[
                styles.filterText,
                !categoriaSelecionada && styles.filterTextSelected,
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterButton,
                categoriaSelecionada === cat && styles.filterButtonSelected,
              ]}
              onPress={() => setCategoriaSelecionada(cat)}
            >
              <Text
                style={[
                  styles.filterText,
                  categoriaSelecionada === cat && styles.filterTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        style={styles.list}
        data={filteredList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            produto={item}
            onPress={() =>
              navigation.navigate("ProductDetail", { produto: item })
            }
          />
        )}
        numColumns={2}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  filterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  filterButton: {
    backgroundColor: COLORS.inactive,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.textDark,
    fontWeight: "500",
    fontSize: 14,
  },
  filterTextSelected: {
    color: COLORS.textLight,
    fontWeight: "600",
  },
  list: {
    flex: 1,
    paddingHorizontal: 8,
  },
});