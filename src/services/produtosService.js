// Lista de jogos com dados fixos
const JOGOS_FIXOS = [
  {
    id: 1,
    title: "Counter-Strike 2",
    price: "0",
    image: "https://th.bing.com/th/id/OIP.OM-ysScsNzFXF5hIP86F-QHaEK?w=306&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Ação, FPS, Multijogador",
    description: "O clássico jogo de tiro tático que define o gênero FPS competitivo."
  },
  {
    id: 2,
    title: "Dota 2",
    price: "0",
    image: "https://th.bing.com/th/id/OIP.sfHuAXtzW0kA_Fw8BnoptAHaEo?w=249&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "MOBA, Estratégia, Multijogador",
    description: "O aclamado MOBA competitivo com torneios multimilionários."
  },
  {
    id: 3,
    title: "The Witcher 3: Wild Hunt",
    price: "49.99",
    image: "https://th.bing.com/th?id=OIF.9z1y0larJ9fDTiB%2fpXX%2f5g&w=297&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "RPG, Mundo Aberto, Ação",
    description: "Um RPG épico de mundo aberto com narrativa envolvente e escolhas significativas."
  },
  {
    id: 4,
    title: "Grand Theft Auto V",
    price: "89.90",
    image: "https://th.bing.com/th/id/OIP.P7W6XR0rB1MWKWDM6saA2gHaEK?w=292&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Ação, Mundo Aberto, Aventura",
    description: "Explore Los Santos em um dos jogos de mundo aberto mais aclamados de todos os tempos."
  },
  {
    id: 5,
    title: "Red Dead Redemption 2",
    price: "199.90",
    image: "https://th.bing.com/th/id/OIP.JZktdCpH1WsAZcv-9wAcegHaEK?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Ação, Aventura, Mundo Aberto",
    description: "Uma épica história de fora da lei no oeste americano com gráficos impressionantes."
  },
  {
    id: 6,
    title: "Cyberpunk 2077",
    price: "149.90",
    image: "https://th.bing.com/th/id/OIP.IF5Au6A6X1uKYDT-SZWP_AHaD4?w=291&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "RPG, Ação, Mundo Aberto",
    description: "Explore Night City, uma megalópole obcecada por poder, glamour e modificações corporais."
  },
  {
    id: 7,
    title: "Elden Ring",
    price: "199.90",
    image: "https://th.bing.com/th/id/OIP.lIgLYCU-5fvehLtxbY0Q_gHaEK?w=269&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "RPG, Ação, Souls-like",
    description: "Um RPG de ação desafiador criado por FromSoftware e George R.R. Martin."
  },
  {
    id: 8,
    title: "Stardew Valley",
    price: "24.99",
    image: "https://th.bing.com/th/id/OIP.IxttfG-Rkss5r6fw8CTh8wHaEK?w=301&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Simulação, RPG, Indie",
    description: "Você herdou a antiga fazenda do seu avô. Com ferramentas de segunda mão e algumas moedas, você começa sua nova vida."
  },
  {
    id: 9,
    title: "Terraria",
    price: "19.99",
    image: "https://th.bing.com/th/id/OIP.WOPyTWkkh-_n4gxfGFhAOgHaHa?w=171&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Sandbox, Aventura, Ação",
    description: "Cave, lute, explore e construa neste jogo de aventura sandbox em 2D."
  },
  {
    id: 10,
    title: "Hollow Knight",
    price: "36.99",
    image: "https://th.bing.com/th/id/OIP.yksrDyeoiGInEdKYFyreeQHaHa?w=178&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Metroidvania, Ação, Indie",
    description: "Explore cavernas retorcidas, cidades antigas e ermos mortais em um reino arruinado."
  },
  {
    id: 11,
    title: "Portal 2",
    price: "19.99",
    image: "https://th.bing.com/th/id/OIP.M-dagBoDNRWMuMRUvsjFegAAAA?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Puzzle, FPS, Comédia",
    description: "O jogo de quebra-cabeças definitivo com humor inteligente e mecânicas inovadoras."
  },
  {
    id: 12,
    title: "Left 4 Dead 2",
    price: "19.99",
    image: "https://th.bing.com/th/id/OIP.nBfzY-eHRIdBGhEqvQns4wAAAA?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Ação, FPS, Cooperativo",
    description: "Sobreviva ao apocalipse zumbi com até 4 jogadores em modo cooperativo."
  },
  {
    id: 13,
    title: "Hades",
    price: "58.99",
    image: "https://th.bing.com/th/id/OIP.XnELkwScvSElzwJh3Pv5QwHaEK?w=322&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Roguelike, Ação, Indie",
    description: "Desafie o deus dos mortos enquanto você atravessa o Submundo neste roguelike de ação."
  },
  {
    id: 14,
    title: "Dark Souls III",
    price: "119.90",
    image: "https://th.bing.com/th/id/OIP.H5boqTad14lZMh4OqlNwvwHaEA?w=254&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "RPG, Ação, Souls-like",
    description: "Encare inimigos implacáveis e bosses épicos neste desafiador RPG de ação."
  },
  {
    id: 15,
    title: "Sekiro: Shadows Die Twice",
    price: "179.90",
    image: "https://th.bing.com/th/id/OIP.sfE_4aGCo5JRUrZGivKDogHaHa?w=160&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Ação, Aventura, Souls-like",
    description: "Vingança toma uma nova forma neste jogo de ação e aventura com combate intenso."
  },
  {
    id: 16,
    title: "Minecraft",
    price: "79.90",
    image: "https://th.bing.com/th/id/OIP.MBm7UYm9qS8hJJ9uJtGSpgHaHa?w=175&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Sandbox, Sobrevivência, Criativo",
    description: "Construa, explore e sobreviva em um mundo gerado proceduralmente feito de blocos."
  },
  {
    id: 17,
    title: "Factorio",
    price: "79.90",
    image: "https://th.bing.com/th/id/OIP.nxciI2ZTs_h79uFvQPUWWAHaEK?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Simulação, Estratégia, Construção",
    description: "Construa e mantenha fábricas automatizadas em um planeta alienígena."
  },
  {
    id: 18,
    title: "Among Us",
    price: "12.99",
    image: "https://th.bing.com/th/id/OIP.CqB0xf5BGrc4dr-dhKbDXAHaFw?w=196&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Multijogador, Party Game, Dedução",
    description: "Jogue online ou via WiFi local com 4-15 jogadores enquanto tentam preparar sua nave."
  },
  {
    id: 19,
    title: "Valheim",
    price: "49.99",
    image: "https://th.bing.com/th/id/OIP.CBMfGEu0WHUVMwD-O5rNlgHaEK?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Sobrevivência, Sandbox, Vikings",
    description: "Explore um purgatório viking gerado proceduralmente para provar seu valor a Odin."
  },
  {
    id: 20,
    title: "Dead Cells",
    price: "49.99",
    image: "https://th.bing.com/th/id/OIP.mi72F_Mz3ul-2_fvpc_XjQHaHa?w=167&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Roguelike, Metroidvania, Ação",
    description: "Um roguevania de ação em 2D com combate intenso e exploração não-linear."
  }
];

// Função para pegar lista de jogos
export async function getProdutosList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...JOGOS_FIXOS]);
    }, 100);
  });
}

// Função para pegar um jogo específico pelo ID
export async function getProdutoById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const jogo = JOGOS_FIXOS.find(j => j.id === parseInt(id));
      
      if (!jogo) {
        reject(new Error("Jogo não encontrado"));
      } else {
        resolve({ ...jogo });
      }
    }, 50);
  });
}