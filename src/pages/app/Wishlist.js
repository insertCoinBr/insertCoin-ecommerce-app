import React, { useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

//IMPORTAR OS CONTEXTS
import { CartContext } from "../../context/CartContext";
import { FavoritesContext } from "../../context/FavoritesContext";
import { CurrencyContext } from "../../context/CurrencyContext";
import { useAlert } from "../../context/AlertContext";

// COMPONENTES
import PageHeader from "../../components/app/PageHeader";
import WishlistItemCard from "../../components/app/WishlistItemCard";
import RPGBorder from "../../components/app/RPGBorder";
import MenuButton from "../../components/app/MenuButton";

import useFontLoader from "../../hooks/useFontLoader";

const COLORS = {
  background: "#1A1027",
  primary: "#4C38A4",
  secondary: "#1F41BB",
};

export default function Wishlist({ navigation }) {
  const fontLoaded = useFontLoader();
  const [refreshing, setRefreshing] = useState(false);

  //USAR O CARTCONTEXT
  const { addToCart, addMultipleToCart } = useContext(CartContext);

  //USAR O FAVORITESCONTEXT
  const {
    favorites,
    removeFromFavorites,
    clearFavorites,
    getFavoritesCount,
    getTotalFavoritesValue,
    validateFavorites,
    loading
  } = useContext(FavoritesContext);

  //USAR O ALERT CUSTOMIZADO
  const { showSuccess, showError, showConfirm } = useAlert();

  //USAR O CURRENCYCONTEXT
  const { formatPrice } = useContext(CurrencyContext);

  // Validar favoritos ao focar na tela
  useFocusEffect(
    useCallback(() => {
      handleRefresh();
    }, [])
  );

  // Atualizar e validar favoritos
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const result = await validateFavorites();

      if (result.validated && result.removed > 0) {
        showSuccess(
          'Favoritos Atualizados',
          `${result.removed} produto(s) não disponível(eis) foi(ram) removido(s) dos favoritos.`
        );
      }
    } catch (error) {
      console.error('Erro ao validar favoritos:', error);
    } finally {
      setRefreshing(false);
    }
  };

  //REMOVER DOS FAVORITOS USANDO CONTEXT
  const handleRemoveItem = async (itemId) => {
    const success = await removeFromFavorites(itemId);

    if (!success) {
      showError('Erro', 'Não foi possível remover o item dos favoritos.');
    }
  };

  //ADICIONAR AO CARRINHO USANDO CONTEXT
  const handleAddToCart = async (product) => {
    const success = await addToCart(product);

    if (success) {
      showConfirm(
        "Adicionado ao Carrinho",
        `${product.title} foi adicionado ao carrinho!`,
        () => navigation.navigate('carts'), // Ir para carrinho
        {
          confirmText: "Ir para Carrinho",
          cancelText: "Continuar Comprando",
          type: "success",
          onCancel: () => {} // Apenas fecha o modal e continua na wishlist
        }
      );
    } else {
      showError('Erro', 'Não foi possível adicionar ao carrinho.');
    }
  };

  //ADICIONAR TODOS AO CARRINHO
  const handleAddAllToCart = async () => {
    if (favorites.length === 0) {
      showError('Lista Vazia', 'Não há itens nos favoritos para adicionar.');
      return;
    }

    const { success, addedCount } = await addMultipleToCart(favorites);

    if (success && addedCount > 0) {
      showConfirm(
        "Itens Adicionados!",
        `${addedCount} ${addedCount === 1 ? 'item foi adicionado' : 'itens foram adicionados'} ao carrinho com sucesso!`,
        () => navigation.navigate('carts'), // Ir para carrinho
        {
          confirmText: "Ir para Carrinho",
          cancelText: "Continuar Comprando",
          type: "success",
          onCancel: () => {} // Apenas fecha o modal e continua na wishlist
        }
      );
    } else {
      showError('Erro', 'Não foi possível adicionar os itens ao carrinho.');
    }
  };

  //LIMPAR TODOS OS FAVORITOS
  const handleClearAllFavorites = async () => {
    showConfirm(
      "Limpar Favoritos",
      "Deseja realmente remover todos os itens da sua lista de desejos?",
      async () => {
        const success = await clearFavorites();
        if (success) {
          showSuccess("Favoritos Limpos", "Todos os itens foram removidos dos favoritos.");
        } else {
          showError("Erro", "Não foi possível limpar os favoritos.");
        }
      },
      {
        confirmText: "Sim, Limpar",
        cancelText: "Cancelar",
        type: "warning"
      }
    );
  };

  if (!fontLoaded || loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <PageHeader 
          onBackPress={() => navigation.goBack()} 
          title="Lista de Desejos" 
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // SE A LISTA ESTÁ VAZIA (USA CONTEXT)
  if (getFavoritesCount() === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <PageHeader 
          onBackPress={() => navigation.goBack()} 
          title="Lista de Desejos" 
        />

        <View style={styles.emptyContent}>
          <Image
            source={require('../../../assets/IconsPixel/iconHeartNull.png')}
            style={styles.emptyIcon}
            resizeMode="contain"
          />

          <Text style={styles.emptyTitle}>Sua lista de desejos</Text>
          <Text style={styles.emptyTitle}>está vazia.</Text>

          <View style={styles.buttonContainer}>
            <MenuButton
              title="Explorar Produtos"
              onPress={() => navigation.navigate('ProductList')}
              borderType="blue"
              centerColor={COLORS.secondary}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        onBackPress={() => navigation.goBack()} 
        title="Lista de Desejos" 
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#A855F7"
            colors={["#A855F7"]}
          />
        }
      >
        {/* LISTA DE ITENS DO CONTEXT */}
        {favorites.map((item) => (
          <WishlistItemCard
            key={item.id}
            product={item}
            onRemove={handleRemoveItem}
            onAddToCart={handleAddToCart}
            borderType="blue"
            centerColor={COLORS.secondary}
          />
        ))}

        {/*  TOTAL USANDO CONTEXT */}
        <View style={styles.totalWrapper}>
          <RPGBorder
            widthPercent={0.9}
            aspectRatio={0.24}
            tileSize={8}
            centerColor={COLORS.primary}
            borderType="black"
            contentPadding={8}
            contentJustify="center"
            contentAlign="center"
          >
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{formatPrice(getTotalFavoritesValue())}</Text>
            </View>
          </RPGBorder>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionsContainer}>
          {/* Botão Adicionar Todos ao Carrinho */}
          <TouchableOpacity
            onPress={handleAddAllToCart}
            activeOpacity={0.8}
            style={styles.addAllButtonWrapper}
          >
            <RPGBorder
              widthPercent={0.9}
              aspectRatio={0.24}
              tileSize={8}
              centerColor={COLORS.secondary}
              borderType="blue"
              contentPadding={8}
              contentJustify="center"
              contentAlign="center"
            >
              <View style={styles.addAllButton}>
                <Text style={styles.addAllButtonText}>ADD IN CART</Text>
              </View>
            </RPGBorder>
          </TouchableOpacity>

          {/* Botão Limpar Todos os Favoritos */}
          <TouchableOpacity
            onPress={handleClearAllFavorites}
            activeOpacity={0.8}
            style={styles.clearAllButtonWrapper}
          >
            <RPGBorder
              widthPercent={0.9}
              aspectRatio={0.24}
              tileSize={8}
              centerColor="#FF4444"
              borderType="red"
              contentPadding={8}
              contentJustify="center"
              contentAlign="center"
            >
              <View style={styles.clearAllButton}>
                <Text style={styles.clearAllButtonText}>LIMPAR FAVORITOS</Text>
              </View>
            </RPGBorder>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "VT323",
  },
  scrollContent: {
    paddingBottom: 140,
    paddingTop: 16,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    marginBottom: 32,
    tintColor: '#666666',
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "VT323",
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 48,
  },
  totalWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  totalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "VT323",
    paddingVertical: 0,
  },
  totalValue: {
    color: "#FFD700",
    fontSize: 26,
    fontFamily: "VT323",
    paddingVertical: 0,
  },
  actionsContainer: {
    marginTop: 16,
    gap: 12,
  },
  addAllButtonWrapper: {
    alignItems: 'center',
  },
  addAllButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
  },
  addAllButtonText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "VT323",
    paddingVertical: 0,
  },
  clearAllButtonWrapper: {
    alignItems: 'center',
  },
  clearAllButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
  },
  clearAllButtonText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "VT323",
    paddingVertical: 0,
  },
});