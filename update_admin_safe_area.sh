#!/bin/bash

# Script para atualizar todos os arquivos admin para usar SafeAreaView
# Este script adiciona SafeAreaView em todos os arquivos admin

echo "Atualizando arquivos admin para SafeAreaView..."

# Lista de arquivos a atualizar (arquivos que ainda não foram atualizados)
files=(
  "src/pages/admin/ClientOrderDetails.js"
  "src/pages/admin/ViewEditProduct.js"
  "src/pages/admin/ViewEditPromotion.js"
  "src/pages/admin/SelectPromotion.js"
  "src/pages/admin/ViewEditNotification.js"
  "src/pages/admin/ViewEditClient.js"
  "src/pages/admin/EditClientForm.js"
  "src/pages/admin/AddNotification.js"
  "src/pages/admin/EditEmployeeForm.js"
  "src/pages/admin/EditNotificationForm.js"
  "src/pages/admin/AddClient.js"
  "src/pages/admin/AddEmployee.js"
  "src/pages/admin/AddProduct.js"
  "src/pages/admin/EditProductForm.js"
  "src/pages/admin/AddPromotion.js"
  "src/pages/admin/EditPromotionForm.js"
  "src/pages/admin/RemoveClient.js"
  "src/pages/admin/RemoveEmployee.js"
  "src/pages/admin/RemoveProduct.js"
  "src/pages/admin/RemoveNotification.js"
  "src/pages/admin/RemovePromotion.js"
  "src/pages/admin/SelectSpecificGames.js"
)

echo "Total de arquivos a atualizar: ${#files[@]}"
echo ""

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processando: $file"
  else
    echo "Arquivo não encontrado: $file"
  fi
done

echo ""
echo "Script gerado! Execute manualmente as atualizações usando o Edit tool."
echo "Padrão a seguir:"
echo "1. Adicionar import: import { SafeAreaView } from 'react-native-safe-area-context';"
echo "2. Envolver JSX com <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>"
echo "3. Adicionar safeArea style e ajustar container style"
echo "4. Adicionar marginTop: 10 ao header"
