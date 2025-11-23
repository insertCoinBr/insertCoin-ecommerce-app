# InsertCoin E-Commerce

Aplicacao mobile de comercio eletronico especializada em jogos digitais, desenvolvida com React Native e Expo. O projeto oferece uma experiencia completa de compra para usuarios finais e um painel administrativo robusto para gestao do negocio.

---

## Sumario

1. [Visao Geral](#visao-geral)
2. [Funcionalidades](#funcionalidades)
3. [Requisitos do Sistema](#requisitos-do-sistema)
4. [Instalacao e Configuracao](#instalacao-e-configuracao)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Arquitetura da Aplicacao](#arquitetura-da-aplicacao)
7. [Gerenciamento de Estado](#gerenciamento-de-estado)
8. [Sistema de Navegacao](#sistema-de-navegacao)
9. [Servicos e Integracao com API](#servicos-e-integracao-com-api)
10. [Componentes](#componentes)
11. [Sistema de Autenticacao](#sistema-de-autenticacao)
12. [Controle de Acesso](#controle-de-acesso)
13. [Estilizacao e Tema](#estilizacao-e-tema)
14. [Armazenamento Local](#armazenamento-local)
15. [Configuracoes do Projeto](#configuracoes-do-projeto)
16. [Scripts Disponiveis](#scripts-disponiveis)
17. [Dependencias](#dependencias)
18. [Consideracoes de Seguranca](#consideracoes-de-seguranca)

---

## Visao Geral

O InsertCoin E-Commerce e uma plataforma mobile completa para venda de jogos digitais. A aplicacao foi projetada com foco em usabilidade, performance e escalabilidade, oferecendo duas interfaces distintas: uma para clientes realizarem compras e outra para administradores gerenciarem o sistema.

### Principais Caracteristicas

- Interface de usuario com tema visual inspirado em jogos retro
- Suporte a multiplas moedas (Real Brasileiro e Dolar Americano)
- Sistema de autenticacao com tokens JWT e expiracao automatica
- Painel administrativo com controle de acesso baseado em papeis
- Carrinho de compras persistente
- Lista de desejos com sincronizacao local
- Sistema de avaliacoes de produtos
- Notificacoes internas
- Processamento de pagamentos via PIX e cartao

### Stack Tecnologico

| Tecnologia | Versao | Finalidade |
|------------|--------|------------|
| React | 19.1.0 | Biblioteca de interface de usuario |
| React Native | 0.81.5 | Framework de desenvolvimento mobile |
| Expo | 54.0.23 | Plataforma de desenvolvimento e build |
| React Navigation | 7.x | Sistema de navegacao |
| Axios | 1.12.2 | Cliente HTTP |
| AsyncStorage | 2.2.0 | Armazenamento local persistente |

---

## Funcionalidades

### Area do Cliente

#### Catalogo de Produtos
- Listagem de jogos com filtragem por categoria e plataforma
- Ordenacao por preco, nome e data de lancamento
- Busca textual por nome do produto
- Visualizacao detalhada com galeria de imagens
- Sistema de avaliacoes com estrelas
- Alternancia entre moedas (BRL/USD)

#### Carrinho de Compras
- Adicao e remocao de itens
- Ajuste de quantidades
- Calculo automatico de totais
- Persistencia local dos itens
- Resumo antes do pagamento

#### Lista de Desejos
- Adicao de produtos favoritos
- Ordenacao por data ou preco
- Filtragem por categoria
- Transferencia rapida para o carrinho

#### Pedidos
- Historico completo de compras
- Detalhes de cada pedido
- Status de processamento
- Informacoes de pagamento

#### Perfil do Usuario
- Visualizacao e edicao de dados pessoais
- Alteracao de senha
- Configuracoes de preferencias
- Gerenciamento de sessao

#### Pagamentos
- Pagamento via PIX com geracao de codigo
- Pagamento via cartao de credito
- Confirmacao de transacao
- Tela de sucesso com detalhes do pedido

### Area Administrativa

#### Gestao de Funcionarios
- Cadastro de novos funcionarios
- Atribuicao de papeis e permissoes
- Edicao de dados cadastrais
- Remocao de funcionarios
- Busca e filtragem

#### Gestao de Clientes
- Visualizacao de todos os clientes
- Edicao de informacoes
- Historico de compras por cliente
- Desativacao de contas

#### Gestao de Produtos
- Cadastro de novos jogos
- Upload de imagens para Cloudinary
- Definicao de precos por moeda
- Selecao de categorias e plataformas
- Edicao e remocao de produtos

#### Gestao de Pedidos
- Listagem de todos os pedidos
- Filtragem por status, data e cliente
- Visualizacao de detalhes
- Atualizacao de status
- Cancelamento de pedidos

#### Gestao de Notificacoes
- Criacao de notificacoes para usuarios
- Tipos: atualizacao, promocao, novidade, sistema
- Agendamento de envio
- Historico de notificacoes enviadas

---

## Requisitos do Sistema

### Ambiente de Desenvolvimento

- Node.js versao 18.0.0 ou superior
- npm versao 9.0.0 ou superior (ou yarn 1.22.0+)
- Expo CLI instalado globalmente
- Git para controle de versao

### Dispositivos de Teste

- Android: Android 6.0 (API 23) ou superior
- iOS: iOS 13.0 ou superior
- Expo Go instalado no dispositivo para desenvolvimento

### Backend

- API Gateway rodando na porta 8765
- Servicos de autenticacao, produtos, pedidos e moedas configurados
- Banco de dados configurado e populado

---

## Instalacao e Configuracao

### Passo 1: Clonar o Repositorio

```bash
git clone https://github.com/seu-usuario/insertCoin-ecommerce-app.git
cd insertCoin-ecommerce-app
```

### Passo 2: Instalar Dependencias

```bash
npm install
```

Ou utilizando yarn:

```bash
yarn install
```

### Passo 3: Configuracao do Ambiente

A aplicacao detecta automaticamente o IP da maquina de desenvolvimento atraves do Expo. Certifique-se de que:

1. O dispositivo ou emulador esta na mesma rede WiFi que a maquina de desenvolvimento
2. O servidor backend esta rodando e acessivel na porta 8765
3. Nao ha firewalls bloqueando a comunicacao

Caso seja necessario configurar manualmente o IP, edite o arquivo `src/config/apiConfig.js`:

```javascript
// Altere o fallback se necessario
const getLocalIP = () => {
  // ...
  return 'SEU_IP_AQUI'; // Ex: '192.168.1.100'
};
```

### Passo 4: Iniciar a Aplicacao

```bash
npm start
```

Apos iniciar, utilize o aplicativo Expo Go para escanear o QR Code exibido no terminal ou navegador.

### Execucao em Plataformas Especificas

```bash
# Android
npm run android

# iOS (apenas em macOS)
npm run ios

# Web
npm run web
```

---

## Estrutura do Projeto

```
insertCoin-ecommerce-app/
│
├── assets/                              # Recursos estaticos
│   ├── images/                          # Imagens da aplicacao
│   ├── icons/                           # Icones customizados
│   └── fonts/                           # Fontes adicionais
│
├── src/                                 # Codigo fonte
│   │
│   ├── components/                      # Componentes reutilizaveis
│   │   ├── admin/                       # Componentes do painel administrativo
│   │   │   ├── AdminContainer.js        # Container principal admin
│   │   │   ├── AdminHeader.js           # Cabecalho administrativo
│   │   │   ├── AdminLayout.js           # Layout base admin
│   │   │   ├── CategorySelector.js      # Seletor de categorias
│   │   │   ├── ConfirmModal.js          # Modal de confirmacao
│   │   │   ├── CustomAlert.js           # Alerta customizado
│   │   │   ├── DatePickerButton.js      # Botao seletor de data
│   │   │   ├── DatePickerModal.js       # Modal de selecao de data
│   │   │   ├── ExpandableMenuItem.js    # Item de menu expansivel
│   │   │   ├── HomeAdminHeader.js       # Cabecalho da home admin
│   │   │   ├── InfoRow.js               # Linha de informacao
│   │   │   ├── MenuItem.js              # Item de menu
│   │   │   ├── OrderListItem.js         # Item de lista de pedidos
│   │   │   ├── PermissionDropdown.js    # Dropdown de permissoes
│   │   │   ├── PlatformSelector.js      # Seletor de plataformas
│   │   │   ├── PrimaryButton.js         # Botao primario
│   │   │   ├── SearchBar.js             # Barra de busca
│   │   │   └── SwitchButton.js          # Botao de alternancia
│   │   │
│   │   └── app/                         # Componentes da area do cliente
│   │       ├── ActionButton.js          # Botao de acao
│   │       ├── AnimatedCardList.js      # Lista animada de cards
│   │       ├── BottomTabBar.js          # Barra de navegacao inferior
│   │       ├── ButtonPrimary.js         # Botao principal
│   │       ├── CarouselDestaques.js     # Carrossel de destaques
│   │       ├── CartItemCard.js          # Card de item do carrinho
│   │       ├── CodeInput.js             # Entrada de codigo
│   │       ├── ConfirmModal.js          # Modal de confirmacao
│   │       ├── CurrencyToggle.js        # Alternador de moeda
│   │       ├── CustomButton.js          # Botao customizado
│   │       ├── CustomInput.js           # Campo de entrada
│   │       ├── ErrorMessage.js          # Mensagem de erro
│   │       ├── FAQItem.js               # Item de FAQ
│   │       ├── FilterModal.js           # Modal de filtros
│   │       ├── ImageCarousel.js         # Carrossel de imagens
│   │       ├── InputFields.js           # Conjunto de campos
│   │       ├── IntegranteCard.js        # Card de integrante
│   │       ├── Logo.js                  # Logo da aplicacao
│   │       ├── MenuButton.js            # Botao de menu
│   │       ├── NotificationCard.js      # Card de notificacao
│   │       ├── OrderCard.js             # Card de pedido
│   │       ├── OrderItemCard.js         # Card de item de pedido
│   │       ├── PageHeader.js            # Cabecalho de pagina
│   │       ├── PaymentMethodCard.js     # Card de metodo de pagamento
│   │       ├── PixelAvatar.js           # Avatar pixelado
│   │       ├── PixelText.js             # Texto estilo pixel
│   │       ├── ProductCard.js           # Card de produto
│   │       ├── ProductGrid.js           # Grid de produtos
│   │       ├── ProfileHeader.js         # Cabecalho de perfil
│   │       ├── RPGAlert.js              # Alerta estilo RPG
│   │       ├── RPGBorder.js             # Borda estilo RPG
│   │       ├── SearchHeader.js          # Cabecalho com busca
│   │       ├── SectionTitle.js          # Titulo de secao
│   │       ├── StarRating.js            # Exibicao de estrelas
│   │       ├── StarRatingInput.js       # Entrada de avaliacao
│   │       ├── TotalCard.js             # Card de total
│   │       └── WishlistItemCard.js      # Card de item favorito
│   │
│   ├── config/                          # Configuracoes
│   │   ├── apiConfig.js                 # URLs e endpoints da API
│   │   └── storageKeys.js               # Chaves do AsyncStorage
│   │
│   ├── context/                         # Contextos React
│   │   ├── AlertContext.js              # Gerenciamento de alertas
│   │   ├── AuthContext.js               # Autenticacao e sessao
│   │   ├── CartContext.js               # Carrinho de compras
│   │   ├── CurrencyContext.js           # Moeda ativa
│   │   ├── FavoritesContext.js          # Lista de favoritos
│   │   ├── NotificationContext.js       # Notificacoes
│   │   └── RatingsContext.js            # Avaliacoes de produtos
│   │
│   ├── hooks/                           # Hooks customizados
│   │   └── useFontLoader.js             # Carregamento de fontes
│   │
│   ├── pages/                           # Telas da aplicacao
│   │   ├── admin/                       # Telas administrativas
│   │   │   ├── AddClient.js             # Adicionar cliente
│   │   │   ├── AddEmployee.js           # Adicionar funcionario
│   │   │   ├── AddProduct.js            # Adicionar produto
│   │   │   ├── EditEmployee.js          # Editar funcionario
│   │   │   ├── HomeAdm.js               # Home administrativa
│   │   │   ├── OrderDetails.js          # Detalhes do pedido
│   │   │   ├── OrderList.js             # Lista de pedidos
│   │   │   ├── RemoveClient.js          # Remover cliente
│   │   │   ├── RemoveEmployee.js        # Remover funcionario
│   │   │   ├── RemoveProduct.js         # Remover produto
│   │   │   ├── ViewEditClient.js        # Ver/editar cliente
│   │   │   └── ViewEditProduct.js       # Ver/editar produto
│   │   │
│   │   ├── app/                         # Telas do cliente
│   │   │   ├── Cart.js                  # Carrinho
│   │   │   ├── ChangePassword.js        # Alterar senha
│   │   │   ├── Notification.js          # Notificacoes
│   │   │   ├── Orders.js                # Meus pedidos
│   │   │   ├── Payment.js               # Pagamento
│   │   │   ├── PaymentSuccess.js        # Pagamento confirmado
│   │   │   ├── PersonalData.js          # Dados pessoais
│   │   │   ├── ProductDetail.js         # Detalhes do produto
│   │   │   ├── ProductList.js           # Lista de produtos
│   │   │   ├── Profile.js               # Perfil
│   │   │   └── Wishlist.js              # Lista de desejos
│   │   │
│   │   └── auth/                        # Telas de autenticacao
│   │       ├── CodigoDeSeguranca.js     # Codigo de verificacao
│   │       ├── CriarConta.js            # Criar conta
│   │       ├── CriarSenha.js            # Criar senha
│   │       ├── EsqueceuSenha.js         # Esqueceu senha
│   │       └── Login.js                 # Login
│   │
│   ├── routes/                          # Configuracao de rotas
│   │   └── index.js                     # Definicao das stacks de navegacao
│   │
│   ├── services/                        # Servicos de dados
│   │   ├── authService.js               # Servico de autenticacao
│   │   ├── cloudinaryService.js         # Upload de imagens
│   │   ├── NotificationStorage.js       # Persistencia de notificacoes
│   │   ├── orderService.js              # Servico de pedidos
│   │   ├── productService.js            # Servico de produtos
│   │   ├── produtosService.js           # Dados mock de produtos
│   │   └── ratingsService.js            # Servico de avaliacoes
│   │
│   ├── styles/                          # Estilos globais
│   │   └── adminStyles.js               # Estilos administrativos
│   │
│   ├── utils/                           # Utilitarios
│   │   ├── permissionHelper.js          # Helpers de permissao
│   │   ├── responsive.js                # Funcoes responsivas
│   │   └── roleHelper.js                # Helpers de papeis
│   │
│   └── App.js                           # Componente raiz
│
├── .gitignore                           # Arquivos ignorados pelo Git
├── app.json                             # Configuracao do Expo
├── index.js                             # Ponto de entrada
├── package.json                         # Dependencias e scripts
└── README.md                            # Este arquivo
```

---

## Arquitetura da Aplicacao

### Visao Geral

A aplicacao segue uma arquitetura baseada em componentes funcionais com hooks, utilizando Context API para gerenciamento de estado global. A separacao de responsabilidades e mantida atraves de camadas bem definidas.

### Diagrama de Camadas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CAMADA DE APRESENTACAO                         │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                              Pages                                    │  │
│  │   Telas que compoe a interface do usuario, consomem contextos e       │  │
│  │   renderizam componentes. Responsaveis pelo layout e interacoes.      │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                            Components                                 │  │
│  │   Componentes reutilizaveis sem logica de negocio. Recebem dados      │  │
│  │   via props e emitem eventos. Totalmente desacoplados do estado.      │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────┤
│                              CAMADA DE ESTADO                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                             Contexts                                  │  │
│  │   Gerenciamento de estado global via Context API. Cada contexto       │  │
│  │   encapsula um dominio especifico: autenticacao, carrinho, moeda.     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────┤
│                              CAMADA DE DADOS                                │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                             Services                                  │  │
│  │   Comunicacao com APIs externas via Axios. Encapsulam endpoints,      │  │
│  │   tratamento de erros e transformacao de dados.                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                           AsyncStorage                                │  │
│  │   Persistencia local de dados. Utilizado para cache, preferencias     │  │
│  │   e dados que precisam sobreviver ao fechamento da aplicacao.         │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Fluxo de Dados

```
Usuario interage com UI
         │
         ▼
    Page/Component
         │
         ├──────────────────────┐
         ▼                      ▼
    Context API           Service Layer
    (Estado Local)        (Requisicoes HTTP)
         │                      │
         │                      ▼
         │                 API Backend
         │                      │
         ▼                      ▼
    AsyncStorage          Banco de Dados
    (Cache Local)         (Dados Remotos)
```

### Principios Arquiteturais

1. **Separacao de Responsabilidades**: Cada camada tem uma funcao especifica e bem definida
2. **Componentes Puros**: Componentes de UI nao contem logica de negocio
3. **Estado Centralizado**: Context API gerencia estado compartilhado
4. **Servicos Desacoplados**: Comunicacao com API isolada em servicos
5. **Configuracao Externalizada**: URLs, chaves e constantes em arquivos separados

---

## Gerenciamento de Estado

A aplicacao utiliza sete contextos React para gerenciar diferentes aspectos do estado global. Cada contexto e responsavel por um dominio especifico, evitando acoplamento e facilitando manutencao.

### AuthContext

Responsavel por toda logica de autenticacao e gerenciamento de sessao do usuario.

**Estado Gerenciado:**
- Dados do usuario autenticado
- Status de login
- Token de autenticacao
- Dados temporarios de cadastro

**Funcoes Disponiveis:**

| Funcao | Parametros | Descricao |
|--------|------------|-----------|
| `login` | email, password | Autentica usuario e armazena sessao |
| `logout` | - | Encerra sessao e limpa dados |
| `saveUserData` | userData | Persiste dados do usuario |
| `restoreSession` | - | Recupera sessao salva ao iniciar app |
| `setTempSignupData` | data | Armazena dados durante fluxo de cadastro |
| `clearTempSignupData` | - | Limpa dados temporarios de cadastro |

**Exemplo de Uso:**

```javascript
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = () => {
  const { login, isLoggedIn, user } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Redirecionamento automatico via Routes
    } catch (error) {
      // Tratamento de erro
    }
  };
};
```

### CartContext

Gerencia o carrinho de compras com persistencia local.

**Estado Gerenciado:**
- Lista de itens no carrinho
- Quantidades de cada item
- Total calculado

**Funcoes Disponiveis:**

| Funcao | Parametros | Descricao |
|--------|------------|-----------|
| `addToCart` | product, quantity | Adiciona item ao carrinho |
| `removeFromCart` | productId | Remove item do carrinho |
| `updateQuantity` | productId, quantity | Atualiza quantidade de item |
| `clearCart` | - | Esvazia o carrinho |
| `getCartTotal` | - | Retorna valor total do carrinho |
| `getItemCount` | - | Retorna quantidade total de itens |

**Exemplo de Uso:**

```javascript
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const isInCart = cartItems.some(item => item.id === product.id);
};
```

### CurrencyContext

Gerencia a moeda ativa e formatacao de precos.

**Estado Gerenciado:**
- Moeda selecionada (BRL ou USD)
- Configuracoes de formatacao

**Funcoes Disponiveis:**

| Funcao | Parametros | Descricao |
|--------|------------|-----------|
| `setCurrency` | currencyCode | Define moeda ativa |
| `formatPrice` | value | Formata valor na moeda atual |
| `getCurrencySymbol` | - | Retorna simbolo da moeda |
| `getCurrencyData` | - | Retorna objeto com dados da moeda |

**Exemplo de Uso:**

```javascript
import { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';

const PriceDisplay = ({ value }) => {
  const { formatPrice, currency } = useContext(CurrencyContext);

  return <Text>{formatPrice(value)}</Text>;
  // Saida: "R$ 199,90" ou "$39.99"
};
```

### FavoritesContext

Gerencia a lista de desejos do usuario.

**Estado Gerenciado:**
- Lista de produtos favoritos
- Ordenacao e filtragem aplicadas

**Funcoes Disponiveis:**

| Funcao | Parametros | Descricao |
|--------|------------|-----------|
| `addToFavorites` | product | Adiciona produto aos favoritos |
| `removeFromFavorites` | productId | Remove produto dos favoritos |
| `toggleFavorite` | product | Alterna estado de favorito |
| `isFavorite` | productId | Verifica se produto e favorito |
| `getFavoritesSortedByPrice` | ascending | Retorna favoritos ordenados |
| `getFavoritesByCategory` | category | Filtra por categoria |

### AlertContext

Sistema centralizado de alertas e notificacoes visuais.

**Funcoes Disponiveis:**

| Funcao | Parametros | Descricao |
|--------|------------|-----------|
| `showAlert` | config | Exibe alerta com configuracao customizada |
| `showSuccess` | message | Exibe alerta de sucesso |
| `showError` | message | Exibe alerta de erro |
| `showWarning` | message | Exibe alerta de aviso |
| `showConfirm` | message, onConfirm, onCancel | Exibe dialogo de confirmacao |
| `hideAlert` | - | Fecha alerta atual |

**Configuracao de Alerta:**

```javascript
showAlert({
  type: 'success' | 'error' | 'warning' | 'info',
  title: 'Titulo do Alerta',
  message: 'Mensagem detalhada',
  duration: 3000, // Auto-fechamento em ms (opcional)
  onClose: () => {}, // Callback ao fechar (opcional)
});
```

### NotificationsContext

Gerencia notificacoes internas da aplicacao.

**Estado Gerenciado:**
- Lista de notificacoes
- Status de leitura
- Notificacoes favoritas

**Funcoes Disponiveis:**

| Funcao | Parametros | Descricao |
|--------|------------|-----------|
| `markAsRead` | notificationId | Marca notificacao como lida |
| `markAllAsRead` | - | Marca todas como lidas |
| `toggleFavorite` | notificationId | Alterna favorito |
| `deleteNotification` | notificationId | Remove notificacao |
| `getUnreadCount` | - | Retorna contagem de nao lidas |

### RatingsContext

Gerencia avaliacoes de produtos feitas pelo usuario.

**Estado Gerenciado:**
- Avaliacoes do usuario
- Medias de avaliacao por produto

**Funcoes Disponiveis:**

| Funcao | Parametros | Descricao |
|--------|------------|-----------|
| `rateProduct` | productId, rating | Avalia um produto |
| `getUserRating` | productId | Retorna avaliacao do usuario |
| `getProductRatingData` | productId | Retorna dados completos de avaliacao |
| `loadBulkProductRatings` | productIds | Carrega avaliacoes em lote |

### Hierarquia de Providers

Os contextos sao aninhados no componente App.js seguindo uma ordem especifica para garantir que dependencias entre contextos sejam respeitadas:

```javascript
// App.js
<AuthProvider>
  <CurrencyProvider>
    <AlertProvider>
      <RatingsProvider>
        <CartProvider>
          <FavoritesProvider>
            <NotificationsProvider>
              <NavigationContainer>
                <Routes />
              </NavigationContainer>
            </NotificationsProvider>
          </FavoritesProvider>
        </CartProvider>
      </RatingsProvider>
    </AlertProvider>
  </CurrencyProvider>
</AuthProvider>
```

---

## Sistema de Navegacao

A aplicacao utiliza React Navigation versao 7 com tres pilhas de navegacao distintas, selecionadas dinamicamente com base no estado de autenticacao e papel do usuario.

### Estrutura de Navegacao

```
Routes (Componente Principal)
│
├── AuthStack (Usuario nao autenticado)
│   │
│   ├── Login
│   │   Tela inicial de login com email e senha
│   │
│   ├── EsqueceuSenha
│   │   Inicio do fluxo de recuperacao de senha
│   │
│   ├── CodigoDeSeguranca
│   │   Validacao do codigo enviado por email
│   │
│   ├── CriarSenha
│   │   Definicao de nova senha
│   │
│   └── CriarConta
│       Cadastro de novo usuario
│
├── AppStack (Cliente autenticado)
│   │
│   ├── ProductList (Tela inicial)
│   │   Catalogo de produtos com busca e filtros
│   │
│   ├── ProductDetail
│   │   Detalhes do produto selecionado
│   │
│   ├── Cart
│   │   Carrinho de compras
│   │
│   ├── Payment
│   │   Selecao de metodo e processamento
│   │
│   ├── PaymentSuccess
│   │   Confirmacao de pagamento
│   │
│   ├── Orders
│   │   Historico de pedidos
│   │
│   ├── Wishlist
│   │   Lista de desejos
│   │
│   ├── Notification
│   │   Central de notificacoes
│   │
│   ├── Profile
│   │   Menu do perfil
│   │
│   ├── PersonalData
│   │   Edicao de dados pessoais
│   │
│   └── ChangePassword
│       Alteracao de senha
│
└── AdmStack (Administrador autenticado)
    │
    ├── HomeAdm (Tela inicial)
    │   Dashboard administrativo
    │
    ├── Gestao de Funcionarios
    │   ├── AddEmployee
    │   ├── EditEmployee
    │   └── RemoveEmployee
    │
    ├── Gestao de Clientes
    │   ├── AddClient
    │   ├── ViewEditClient
    │   └── RemoveClient
    │
    ├── Gestao de Produtos
    │   ├── AddProduct
    │   ├── ViewEditProduct
    │   └── RemoveProduct
    │
    └── Gestao de Pedidos
        ├── OrderList
        └── OrderDetails
```

### Logica de Selecao de Stack

A decisao de qual stack exibir e feita no componente Routes com base no estado de autenticacao e papeis do usuario:

```javascript
// routes/index.js
const Routes = () => {
  const { isLoggedIn, user } = useContext(AuthContext);

  // Usuario nao autenticado: exibe telas de login/cadastro
  if (!isLoggedIn) {
    return <AuthStack />;
  }

  // Usuario com papel administrativo: exibe painel admin
  if (isAdminRole(user?.roles)) {
    return <AdmStack />;
  }

  // Usuario cliente: exibe aplicacao de compras
  return <AppStack />;
};
```

### Navegacao Programatica

```javascript
import { useNavigation } from '@react-navigation/native';

const MyComponent = () => {
  const navigation = useNavigation();

  // Navegar para tela
  navigation.navigate('ProductDetail', { productId: 123 });

  // Voltar para tela anterior
  navigation.goBack();

  // Resetar pilha de navegacao
  navigation.reset({
    index: 0,
    routes: [{ name: 'ProductList' }],
  });
};
```

---

## Servicos e Integracao com API

### Configuracao do Cliente HTTP

A comunicacao com o backend e realizada atraves do Axios, configurado centralmente em `src/config/apiConfig.js`.

**Deteccao Automatica de IP:**

```javascript
const getLocalIP = () => {
  try {
    let debuggerHost = Constants.expoConfig?.hostUri ||
                       Constants.manifest2?.extra?.expoGo?.debuggerHost ||
                       Constants.manifest?.debuggerHost;

    if (debuggerHost) {
      return debuggerHost.split(':')[0];
    }
    return 'localhost';
  } catch (error) {
    return 'localhost';
  }
};
```

**Configuracao Base:**

```javascript
export const API_URLS = {
  GATEWAY: `http://${LOCAL_IP}:8765`,
};
```

**Interceptor de Autenticacao:**

Todas as requisicoes incluem automaticamente o token de autenticacao quando disponivel:

```javascript
api.interceptors.request.use(async (config) => {
  const token = await getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Endpoints Disponiveis

#### Autenticacao (`AUTH_ENDPOINTS`)

| Endpoint | Metodo | Descricao |
|----------|--------|-----------|
| `/auth/verify-email` | POST | Verifica se email existe |
| `/auth/validate-code` | POST | Valida codigo de verificacao |
| `/auth/signup` | POST | Cadastra novo usuario |
| `/auth/signin` | POST | Autentica usuario |
| `/auth/reset-password` | POST | Redefine senha |
| `/auth/forgot-password` | POST | Inicia recuperacao de senha |
| `/auth/me` | GET | Retorna dados do usuario logado |
| `/auth/me/update` | PUT | Atualiza dados do usuario |

#### Administracao (`ADMIN_ENDPOINTS`)

| Endpoint | Metodo | Descricao |
|----------|--------|-----------|
| `/auth/admin/signup` | POST | Cadastra funcionario |
| `/auth/admin/employees/update/:id` | PUT | Atualiza funcionario |
| `/auth/admin/clients/update/:id` | PUT | Atualiza cliente |
| `/auth/admin/users/:id` | GET | Busca usuario por ID |
| `/auth/admin/employees/search` | GET | Busca funcionarios |
| `/auth/admin/clients/search` | GET | Busca clientes |

#### Produtos (`PRODUCT_ENDPOINTS`)

| Endpoint | Metodo | Descricao |
|----------|--------|-----------|
| `/products` | GET | Lista todos os produtos |
| `/products/:id` | GET | Busca produto por ID |
| `/products/rating/:productId` | GET/POST | Avaliacoes do produto |
| `/products/categories` | GET | Lista categorias |
| `/products/platforms` | GET | Lista plataformas |
| `/ws/products/addProduct` | POST | Adiciona produto (admin) |
| `/ws/products/updateProduct/:id` | PUT | Atualiza produto (admin) |
| `/ws/products/removeProduct/:id` | DELETE | Remove produto (admin) |

#### Pedidos (`ORDER_ENDPOINTS`)

| Endpoint | Metodo | Descricao |
|----------|--------|-----------|
| `/orders` | POST | Cria novo pedido |
| `/orders/:orderId` | GET | Busca pedido por ID |
| `/orders/user` | GET | Lista pedidos do usuario |
| `/orders/admin/deleteOrder/:orderId` | DELETE | Remove pedido (admin) |

### Servicos Implementados

#### authService.js

Gerencia autenticacao e dados de usuario.

```javascript
// Funcoes exportadas
export const verifyEmail = async (email) => { ... };
export const verifyCode = async (email, code) => { ... };
export const signup = async (userData) => { ... };
export const signin = async (email, password) => { ... };
export const getMe = async () => { ... };
export const updateMe = async (data) => { ... };
export const resetPassword = async (email, newPassword) => { ... };

// Gerenciamento de token
export const setStoredToken = async (token) => { ... };
export const getStoredToken = async () => { ... };
export const checkTokenExpiry = async () => { ... };
export const clearAllAuthData = async () => { ... };
```

#### productService.js

Operacoes com produtos e catalogo.

```javascript
// Funcoes exportadas
export const getProducts = async (currency = 'BRL') => { ... };
export const getProductById = async (id) => { ... };
export const getCategories = async () => { ... };
export const getPlatforms = async () => { ... };
export const addProduct = async (productData) => { ... };
export const updateProduct = async (id, productData) => { ... };
export const deleteProduct = async (id) => { ... };
```

#### orderService.js

Gerenciamento de pedidos.

```javascript
// Funcoes exportadas
export const createOrder = async (orderData) => { ... };
export const getOrderById = async (orderId) => { ... };
export const getUserOrders = async () => { ... };
export const searchOrders = async (filters) => { ... };
export const deleteOrder = async (orderId) => { ... };
```

#### cloudinaryService.js

Upload de imagens para Cloudinary.

```javascript
// Funcoes exportadas
export const uploadImage = async (imageUri) => { ... };
export const uploadMultipleImages = async (imageUris) => { ... };
```

### Padrao de Tratamento de Erros

Todos os servicos seguem um padrao consistente de tratamento de erros:

```javascript
export const fetchData = async (params) => {
  try {
    const response = await api.get('/endpoint', { params });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Erro do servidor com resposta
      console.error('Erro do servidor:', error.response.data);
      throw new Error(error.response.data.message || 'Erro no servidor');
    } else if (error.request) {
      // Requisicao feita mas sem resposta
      console.error('Sem resposta do servidor');
      throw new Error('Servidor indisponivel');
    } else {
      // Erro na configuracao da requisicao
      console.error('Erro na requisicao:', error.message);
      throw error;
    }
  }
};
```

---

## Componentes

### Principios de Design de Componentes

Todos os componentes seguem estes principios:

1. **Funcoes Puras**: Componentes nao modificam props ou estado externo
2. **Composicao**: Componentes pequenos combinados para formar complexos
3. **Props Tipadas**: Documentacao clara de props esperadas
4. **Estilos Isolados**: StyleSheet definido no proprio arquivo
5. **Hooks para Logica**: useState, useEffect, useCallback para estado local

### Estrutura Padrao de Componente

```javascript
import React, { useState, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CurrencyContext } from '../../context/CurrencyContext';

/**
 * ProductCard - Exibe informacoes resumidas de um produto
 *
 * @param {Object} product - Dados do produto
 * @param {Function} onPress - Callback ao pressionar o card
 * @param {Object} style - Estilos adicionais (opcional)
 */
const ProductCard = ({ product, onPress, style }) => {
  const { formatPrice } = useContext(CurrencyContext);
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = useCallback(() => {
    onPress?.(product);
  }, [product, onPress]);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141B3A',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1B254F',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    color: '#3cff00',
    fontSize: 14,
    marginTop: 4,
  },
});

export default ProductCard;
```

### Componentes Principais da Area do Cliente

#### ProductCard

Exibe um produto na listagem do catalogo.

**Props:**

| Prop | Tipo | Obrigatorio | Descricao |
|------|------|-------------|-----------|
| product | Object | Sim | Dados do produto |
| onPress | Function | Nao | Callback ao pressionar |
| onFavorite | Function | Nao | Callback ao favoritar |
| showRating | Boolean | Nao | Exibe avaliacao |

#### CartItemCard

Exibe um item no carrinho de compras.

**Props:**

| Prop | Tipo | Obrigatorio | Descricao |
|------|------|-------------|-----------|
| item | Object | Sim | Item do carrinho |
| onUpdateQuantity | Function | Sim | Callback para atualizar quantidade |
| onRemove | Function | Sim | Callback para remover |

#### CustomInput

Campo de entrada de texto customizado.

**Props:**

| Prop | Tipo | Obrigatorio | Descricao |
|------|------|-------------|-----------|
| label | String | Nao | Rotulo do campo |
| value | String | Sim | Valor atual |
| onChangeText | Function | Sim | Callback de alteracao |
| placeholder | String | Nao | Texto placeholder |
| secureTextEntry | Boolean | Nao | Oculta texto (senha) |
| error | String | Nao | Mensagem de erro |
| keyboardType | String | Nao | Tipo de teclado |

#### RPGAlert

Modal de alerta com visual tematico.

**Props:**

| Prop | Tipo | Obrigatorio | Descricao |
|------|------|-------------|-----------|
| visible | Boolean | Sim | Visibilidade do modal |
| type | String | Sim | Tipo: success, error, warning, info |
| title | String | Nao | Titulo do alerta |
| message | String | Sim | Mensagem do alerta |
| onClose | Function | Sim | Callback ao fechar |
| onConfirm | Function | Nao | Callback de confirmacao |

#### StarRating

Exibe avaliacao em estrelas.

**Props:**

| Prop | Tipo | Obrigatorio | Descricao |
|------|------|-------------|-----------|
| rating | Number | Sim | Valor da avaliacao (0-5) |
| size | Number | Nao | Tamanho das estrelas |
| color | String | Nao | Cor das estrelas preenchidas |

#### StarRatingInput

Permite usuario inserir avaliacao.

**Props:**

| Prop | Tipo | Obrigatorio | Descricao |
|------|------|-------------|-----------|
| value | Number | Sim | Valor atual |
| onChange | Function | Sim | Callback de alteracao |
| size | Number | Nao | Tamanho das estrelas |
| disabled | Boolean | Nao | Desabilita interacao |

### Componentes Administrativos

#### AdminLayout

Container principal para telas administrativas.

**Props:**

| Prop | Tipo | Obrigatorio | Descricao |
|------|------|-------------|-----------|
| children | Node | Sim | Conteudo da tela |
| title | String | Nao | Titulo no cabecalho |
| showBackButton | Boolean | Nao | Exibe botao voltar |

#### SearchBar

Barra de busca com filtragem.

**Props:**

| Prop | Tipo | Obrigatorio | Descricao |
|------|------|-------------|-----------|
| value | String | Sim | Texto de busca |
| onChangeText | Function | Sim | Callback de alteracao |
| placeholder | String | Nao | Texto placeholder |
| onFilter | Function | Nao | Callback de filtro |

#### PermissionDropdown

Dropdown para selecao de papeis/permissoes.

**Props:**

| Prop | Tipo | Obrigatorio | Descricao |
|------|------|-------------|-----------|
| selectedRole | String | Sim | Papel selecionado |
| onSelect | Function | Sim | Callback de selecao |
| roles | Array | Sim | Lista de papeis disponiveis |

---

## Sistema de Autenticacao

### Fluxo de Login

```
┌────────────────────────────────────────────────────────────────────────────┐
│                              FLUXO DE LOGIN                                │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  1. Usuario acessa tela de Login                                           │
│                     │                                                      │
│                     ▼                                                      │
│  2. Insere email e senha                                                   │
│                     │                                                      │
│                     ▼                                                      │
│  3. Validacao local (formato email, senha minima)                          │
│                     │                                                      │
│                     ▼                                                      │
│  4. POST /auth/signin com credenciais                                      │
│                    │                                                       │
│          ┌─────────┴─────────┐                                             │
│          ▼                   ▼                                             │
│     [Sucesso]            [Erro]                                            │
│          │                   │                                             │
│          ▼                   ▼                                             │
│  5. Recebe token JWT    Exibe mensagem                                     │
│          │              de erro                                            │
│          ▼                                                                 │
│  6. Salva token + timestamp de expiracao (24h)                             │
│          │                                                                 │
│          ▼                                                                 │
│  7. GET /auth/me para obter dados do usuario                               │
│          │                                                                 │
│          ▼                                                                 │
│  8. Salva dados no AuthContext e AsyncStorage                              │
│          │                                                                 │
│          ▼                                                                 │
│  9. Verifica papeis do usuario (isAdminRole)                               │
│          │                                                                 │
│          ├─────────────────────────────────┐                               │
│          ▼                                 ▼                               │
│     [Admin/Manager]                   [Cliente]                            │
│          │                                 │                               │
│          ▼                                 ▼                               │
│  10. Redireciona para              Redireciona para                        │
│      AdmStack                      AppStack                                │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Fluxo de Cadastro

```
┌────────────────────────────────────────────────────────────────────────────┐
│                            FLUXO DE CADASTRO                               │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  1. Usuario acessa tela de Criar Conta                                     │
│                     │                                                      │
│                     ▼                                                      │
│  2. Insere email                                                           │
│                     │                                                      │
│                     ▼                                                      │
│  3. POST /auth/verify-email                                                │
│                    │                                                       │
│          ┌─────────┴─────────┐                                             │
│          ▼                   ▼                                             │
│     [Disponivel]        [Ja existe]                                        │
│          │                   │                                             │
│          ▼                   ▼                                             │
│  4. Envia codigo        Exibe erro                                         │
│     por email           "Email ja cadastrado"                              │
│          │                                                                 │
│          ▼                                                                 │
│  5. Redireciona para CodigoDeSeguranca                                     │
│          │                                                                 │
│          ▼                                                                 │
│  6. Usuario insere codigo recebido                                         │
│          │                                                                 │
│          ▼                                                                 │
│  7. POST /auth/validate-code                                               │
│          │                                                                 │
│          ▼                                                                 │
│  8. Redireciona para CriarSenha                                            │
│          │                                                                 │
│          ▼                                                                 │
│  9. Usuario define senha e confirma                                        │
│          │                                                                 │
│          ▼                                                                 │
│  10. Usuario preenche dados pessoais (nome, CPF, telefone)                 │
│          │                                                                 │
│          ▼                                                                 │
│  11. POST /auth/signup com todos os dados                                  │
│          │                                                                 │
│          ▼                                                                 │
│  12. Conta criada, redireciona para Login                                  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Gerenciamento de Token

O token JWT e armazenado localmente com um timestamp de expiracao. A cada inicializacao da aplicacao e antes de cada requisicao autenticada, a validade e verificada.

**Armazenamento:**

```javascript
// Ao receber token do servidor
export const setStoredToken = async (token) => {
  const now = Date.now();
  const expiryTime = now + (24 * 60 * 60 * 1000); // 24 horas em ms

  await AsyncStorage.setItem('@insertcoin:auth_token', token);
  await AsyncStorage.setItem('@insertcoin:token_expiry', expiryTime.toString());
};
```

**Verificacao:**

```javascript
// Ao recuperar token
export const getStoredToken = async () => {
  const token = await AsyncStorage.getItem('@insertcoin:auth_token');
  const expiry = await AsyncStorage.getItem('@insertcoin:token_expiry');

  if (!token || !expiry) {
    return null;
  }

  // Verifica se expirou
  if (Date.now() > parseInt(expiry, 10)) {
    await clearAllAuthData();
    return null;
  }

  return token;
};
```

**Restauracao de Sessao:**

Ao iniciar a aplicacao, o AuthContext tenta restaurar a sessao anterior:

```javascript
const restoreSession = async () => {
  try {
    const { isValid, isExpired, token } = await checkTokenExpiry();

    if (isExpired) {
      showAlert({
        type: 'warning',
        message: 'Sua sessao expirou. Por favor, faca login novamente.'
      });
      await clearAllAuthData();
      return;
    }

    if (isValid && token) {
      const userData = await getMe();
      setUser(userData);
      setIsLoggedIn(true);
    }
  } catch (error) {
    console.error('Erro ao restaurar sessao:', error);
    await clearAllAuthData();
  }
};
```

---

## Controle de Acesso

### Papeis de Usuario

A aplicacao define seis papeis de usuario, cada um com permissoes especificas:

| Papel | Codigo | Descricao | Area de Acesso |
|-------|--------|-----------|----------------|
| Administrador | ROLE_ADMIN | Acesso total ao sistema | Administrativa |
| Comercial | ROLE_COMMERCIAL | Gestao de vendas e clientes | Administrativa |
| Gerente | ROLE_MANAGER | Gestao geral da loja | Administrativa |
| Gerente de Loja | ROLE_MANAGER_STORE | Gestao de loja especifica | Administrativa |
| Funcionario | ROLE_EMPLOYEE | Operacoes basicas | Administrativa |
| Cliente | ROLE_CLIENT | Compras e perfil | Cliente |

### Matriz de Permissoes

| Permissao | ADMIN | MANAGER_STORE | COMMERCIAL | EMPLOYEE |
|-----------|-------|---------------|------------|----------|
| Funcionarios | Sim | Sim | Nao | Nao |
| Pedidos | Sim | Sim | Sim | Sim |
| Clientes | Sim | Sim | Sim | Nao |
| Produtos | Sim | Sim | Sim | Nao |
| Notificacoes | Sim | Sim | Nao | Nao |
| Relatorios | Sim | Nao | Nao | Nao |

### Implementacao do Controle de Acesso

**Verificacao de Papel:**

```javascript
// roleHelper.js
const ADMIN_ROLES = [
  'ROLE_ADMIN',
  'ROLE_COMMERCIAL',
  'ROLE_MANAGER',
  'ROLE_MANAGER_STORE',
  'ROLE_EMPLOYEE'
];

export const isAdminRole = (roles) => {
  if (!roles || !Array.isArray(roles)) return false;
  return roles.some(role => ADMIN_ROLES.includes(role));
};

export const isClientRole = (roles) => {
  if (!roles || !Array.isArray(roles)) return false;
  return roles.includes('ROLE_CLIENT');
};

export const getUserAreaType = (roles) => {
  if (isAdminRole(roles)) return 'admin';
  if (isClientRole(roles)) return 'client';
  return 'unknown';
};
```

**Verificacao de Permissao:**

```javascript
// permissionHelper.js
const ROLE_PERMISSIONS = {
  ROLE_ADMIN: {
    employees: true,
    orders: true,
    clients: true,
    products: true,
    notifications: true,
    reports: true,
  },
  ROLE_MANAGER_STORE: {
    employees: true,
    orders: true,
    clients: true,
    products: true,
    notifications: true,
    reports: false,
  },
  // ... demais papeis
};

export const hasPermission = (roles, permission) => {
  if (!roles || !Array.isArray(roles)) return false;

  for (const role of roles) {
    if (ROLE_PERMISSIONS[role]?.[permission]) {
      return true;
    }
  }
  return false;
};

export const filterMenuByPermissions = (menuItems, roles) => {
  return menuItems.filter(item => {
    if (!item.permission) return true;
    return hasPermission(roles, item.permission);
  });
};
```

**Uso em Componentes:**

```javascript
import { hasPermission } from '../utils/permissionHelper';

const AdminMenu = () => {
  const { user } = useContext(AuthContext);

  return (
    <View>
      {hasPermission(user?.roles, 'employees') && (
        <MenuItem title="Funcionarios" screen="EmployeeList" />
      )}
      {hasPermission(user?.roles, 'products') && (
        <MenuItem title="Produtos" screen="ProductList" />
      )}
      {hasPermission(user?.roles, 'reports') && (
        <MenuItem title="Relatorios" screen="Reports" />
      )}
    </View>
  );
};
```

---

## Estilizacao e Tema

### Sistema de Cores

A aplicacao utiliza um tema escuro com cores inspiradas em jogos retro:

```javascript
// Paleta de cores principal
const colors = {
  // Fundos
  background: '#0A0F24',        // Fundo principal (azul muito escuro)
  cardBackground: '#141B3A',    // Fundo de cards (azul escuro)

  // Cores primarias
  primary: '#1D3CFD',           // Azul eletrico
  primaryDark: '#1F41BB',       // Azul escuro
  primaryLight: '#4169E1',      // Azul claro

  // Cores de destaque
  accent: '#3cff00',            // Verde neon (precos, destaques)
  accentDark: '#2ecc00',        // Verde escuro

  // Bordas
  border: '#1B254F',            // Borda padrao
  borderLight: '#2D3A6F',       // Borda clara

  // Textos
  text: '#ffffff',              // Texto principal
  textSecondary: '#aaaaaa',     // Texto secundario
  textMuted: '#666666',         // Texto desabilitado
  textPlaceholder: '#cccccc',   // Placeholder de inputs

  // Estados
  success: '#00ff88',           // Sucesso
  error: '#ff4444',             // Erro
  warning: '#ffaa00',           // Aviso
  info: '#00aaff',              // Informacao

  // Sobreposicoes
  overlay: 'rgba(0, 0, 0, 0.7)', // Fundo de modais
};
```

### Sistema Responsivo

Funcoes utilitarias para adaptacao a diferentes tamanhos de tela:

```javascript
// responsive.js
import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dimensoes base (iPhone 11 Pro)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Calcula porcentagem da largura da tela
 * @param {number} percentage - Porcentagem desejada (0-100)
 * @returns {number} Valor em pixels
 */
export const wp = (percentage) => {
  return (SCREEN_WIDTH * percentage) / 100;
};

/**
 * Calcula porcentagem da altura da tela
 * @param {number} percentage - Porcentagem desejada (0-100)
 * @returns {number} Valor em pixels
 */
export const hp = (percentage) => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

/**
 * Escala tamanho de fonte baseado na largura da tela
 * @param {number} size - Tamanho base da fonte
 * @returns {number} Tamanho escalado
 */
export const scaleFontSize = (size) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const scaledSize = size * scale;

  // iOS e Android tem renderizacao de fonte diferente
  return Platform.OS === 'ios'
    ? Math.round(scaledSize)
    : Math.round(scaledSize) - 2;
};

/**
 * Escala dimensao horizontal
 * @param {number} size - Tamanho base
 * @returns {number} Tamanho escalado
 */
export const scaleWidth = (size) => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

/**
 * Escala dimensao vertical
 * @param {number} size - Tamanho base
 * @returns {number} Tamanho escalado
 */
export const scaleHeight = (size) => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

/**
 * Verifica se dispositivo e pequeno
 * @returns {boolean}
 */
export const isSmallDevice = () => SCREEN_WIDTH < 375;

/**
 * Verifica se dispositivo e tablet
 * @returns {boolean}
 */
export const isTablet = () => SCREEN_WIDTH >= 768;
```

### Fonte Customizada

A aplicacao utiliza a fonte VT323, uma fonte com estilo pixel art que reforça o tema de jogos retro:

```javascript
// useFontLoader.js
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';

export const useFontLoader = () => {
  const [fontsLoaded] = useFonts({
    VT323_400Regular,
  });

  return { fontsLoaded };
};

// Uso em componentes
const PixelText = ({ children, style }) => {
  return (
    <Text style={[styles.pixelText, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  pixelText: {
    fontFamily: 'VT323_400Regular',
    fontSize: 24,
    color: '#ffffff',
  },
});
```

### Estilos Reutilizaveis

```javascript
// adminStyles.js - Estilos compartilhados no painel admin
export const commonStyles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },

  // Cards
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },

  // Inputs
  input: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
  },

  inputFocused: {
    borderColor: colors.primary,
  },

  inputError: {
    borderColor: colors.error,
  },

  // Botoes
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDisabled: {
    backgroundColor: colors.primaryDark,
    opacity: 0.5,
  },

  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },

  // Textos
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 8,
  },

  label: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },

  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },

  // Layout
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

---

## Armazenamento Local

### Chaves de Armazenamento

Todas as chaves utilizadas no AsyncStorage estao centralizadas:

```javascript
// storageKeys.js
export const STORAGE_KEYS = {
  // Autenticacao
  AUTH_TOKEN: '@insertcoin:auth_token',
  TOKEN_EXPIRY: '@insertcoin:token_expiry',
  USER_DATA: '@insertcoin:user_data',

  // Configuracoes
  API_URL: '@insertcoin:api_url',
  CURRENCY: '@currency',

  // Dados do usuario
  CART: '@insertcoin:cart',
  FAVORITES: '@insertcoin:favorites',
  RATINGS: '@insertcoin:ratings',

  // Notificacoes
  NOTIFICATIONS_READ: '@insertcoin:notifications_read',
  NOTIFICATIONS_FAVORITES: '@insertcoin:notifications_favorites',
};
```

### Padroes de Uso

**Salvando Dados:**

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/storageKeys';

const saveCart = async (cartItems) => {
  try {
    const jsonValue = JSON.stringify(cartItems);
    await AsyncStorage.setItem(STORAGE_KEYS.CART, jsonValue);
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error);
  }
};
```

**Recuperando Dados:**

```javascript
const loadCart = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.CART);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Erro ao carregar carrinho:', error);
    return [];
  }
};
```

**Removendo Dados:**

```javascript
const clearCart = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.CART);
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error);
  }
};
```

**Limpando Todos os Dados:**

```javascript
const clearAllAuthData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.TOKEN_EXPIRY,
      STORAGE_KEYS.USER_DATA,
    ]);
  } catch (error) {
    console.error('Erro ao limpar dados de autenticacao:', error);
  }
};
```

---

## Configuracoes do Projeto

### Configuracao Expo (app.json)

```json
{
  "expo": {
    "name": "InsertCoin Ecommerce",
    "slug": "InsertCoinEcommerce",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0A0F24"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.insertcoin.ecommerce"
    },
    "android": {
      "edgeToEdgeEnabled": true,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0A0F24"
      },
      "package": "com.insertcoin.ecommerce"
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-font",
      "expo-video"
    ]
  }
}
```

### Configuracao de API (apiConfig.js)

```javascript
// Deteccao automatica de IP via Expo
const getLocalIP = () => {
  try {
    let debuggerHost = Constants.expoConfig?.hostUri ||
                       Constants.manifest2?.extra?.expoGo?.debuggerHost ||
                       Constants.manifest?.debuggerHost;

    if (debuggerHost) {
      return debuggerHost.split(':')[0];
    }
    return 'localhost';
  } catch (error) {
    return 'localhost';
  }
};

const LOCAL_IP = getLocalIP();

// URLs base dos servicos
export const API_URLS = {
  GATEWAY: `http://${LOCAL_IP}:8765`,
};

// Endpoints organizados por dominio
export const AUTH_ENDPOINTS = {
  VERIFY_EMAIL: '/auth/verify-email',
  VALIDATE_CODE: '/auth/validate-code',
  SIGNUP: '/auth/signup',
  SIGNIN: '/auth/signin',
  RESET_PASSWORD: '/auth/reset-password',
  FORGOT_PASSWORD: '/auth/forgot-password',
  ME: '/auth/me',
  ME_UPDATE: '/auth/me/update',
};

export const PRODUCT_ENDPOINTS = {
  LIST: '/products',
  BY_ID: '/products',
  RATING: '/products/rating',
  CATEGORIES: '/products/categories',
  PLATFORMS: '/products/platforms',
  ADD: '/ws/products/addProduct',
  REMOVE: '/ws/products/removeProduct',
  UPDATE: '/ws/products/updateProduct',
};

export const ORDER_ENDPOINTS = {
  CREATE: '/orders',
  BY_ID: '/orders',
  USER_ORDERS: '/orders/user',
  DELETE: '/orders/admin/deleteOrder',
};
```

---

## Scripts Disponiveis

| Script | Comando | Descricao |
|--------|---------|-----------|
| start | `npm start` | Inicia servidor de desenvolvimento Expo |
| android | `npm run android` | Inicia aplicacao no Android |
| ios | `npm run ios` | Inicia aplicacao no iOS (requer macOS) |
| web | `npm run web` | Inicia aplicacao no navegador |

### Uso dos Scripts

**Desenvolvimento:**

```bash
# Iniciar servidor de desenvolvimento
npm start

# O terminal exibira um QR Code
# Escaneie com o app Expo Go no seu dispositivo
```

**Build para Android:**

```bash
# Iniciar diretamente no emulador ou dispositivo conectado
npm run android
```

**Build para iOS:**

```bash
# Requer macOS com Xcode instalado
npm run ios
```

**Build para Web:**

```bash
npm run web
# Abre automaticamente no navegador padrao
```

---

## Dependencias

### Dependencias de Producao

```json
{
  "dependencies": {
    "@expo-google-fonts/vt323": "^0.4.1",
    "@expo/vector-icons": "15.0.3",
    "@react-native-async-storage/async-storage": "^2.2.0",
    "@react-native-community/datetimepicker": "8.4.4",
    "@react-navigation/bottom-tabs": "^7.4.8",
    "@react-navigation/native": "^7.1.18",
    "@react-navigation/native-stack": "^7.3.27",
    "axios": "^1.12.2",
    "expo": "~54.0.23",
    "expo-av": "~16.0.7",
    "expo-clipboard": "^8.0.7",
    "expo-constants": "~17.0.10",
    "expo-font": "~14.0.9",
    "expo-image-picker": "~17.0.8",
    "expo-linear-gradient": "~15.0.7",
    "expo-navigation-bar": "~5.0.9",
    "expo-status-bar": "~3.0.8",
    "expo-video": "~3.0.14",
    "expo-video-thumbnails": "~10.0.7",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-native": "0.81.5",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-modal": "^14.0.0-rc.1",
    "react-native-reanimated": "^4.1.3",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-vector-icons": "^10.3.0",
    "react-native-web": "^0.21.0",
    "react-native-worklets": "0.5.1"
  }
}
```

### Descricao das Dependencias

| Pacote | Proposito |
|--------|-----------|
| react, react-native | Framework base para desenvolvimento mobile |
| expo | Plataforma de desenvolvimento e build |
| @react-navigation/* | Sistema de navegacao entre telas |
| axios | Cliente HTTP para requisicoes a API |
| @react-native-async-storage/async-storage | Armazenamento local persistente |
| expo-font, @expo-google-fonts/vt323 | Carregamento de fontes customizadas |
| react-native-vector-icons, @expo/vector-icons | Bibliotecas de icones |
| react-native-gesture-handler | Manipulacao de gestos touch |
| react-native-reanimated | Sistema de animacoes performatico |
| react-native-safe-area-context | Gerenciamento de areas seguras |
| react-native-screens | Otimizacao de telas nativas |
| expo-linear-gradient | Componente de gradiente |
| expo-image-picker | Selecao de imagens do dispositivo |
| expo-video, expo-av | Reproducao de midia |
| react-native-modal | Componente de modal |
| @react-native-community/datetimepicker | Seletor de data e hora |

---

## Consideracoes de Seguranca

### Autenticacao

- Tokens JWT com expiracao de 24 horas
- Verificacao automatica de expiracao antes de requisicoes
- Limpeza completa de dados ao fazer logout
- Restauracao segura de sessao ao reiniciar aplicacao

### Armazenamento

- Dados sensiveis armazenados apenas em AsyncStorage (nao em estado global)
- Chaves de armazenamento centralizadas para evitar erros
- Limpeza de cache ao expirar sessao

### Comunicacao

- Todas as requisicoes incluem token no header Authorization
- Interceptors do Axios para injecao automatica de token
- Tratamento padronizado de erros de rede

### Controle de Acesso

- Verificacao de papeis no lado do cliente para UX
- Endpoints protegidos no backend para seguranca real
- Filtragem de menus baseada em permissoes

### Boas Praticas

- Validacao de entrada em formularios
- Sanitizacao de dados antes de exibicao
- Logs de erro sem exposicao de dados sensiveis
- Nenhuma senha ou token em logs
