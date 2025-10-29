import axios from "axios";


// Função para pegar lista de jogos (limitada a 100)
export async function getProdutosList() {
  // Passo 1: buscar lista de apps da Steam
  const appListResponse = await axios.get("https://api.steampowered.com/ISteamApps/GetAppList/v2/");
  const apps = appListResponse.data.applist.apps.slice(0, 100); // Pega os 100 primeiros

  // Passo 2: buscar detalhes de cada jogo individualmente
  const produtosList = await Promise.all(
    apps.map(async (app) => {
      try {
        const detailUrl = `https://store.steampowered.com/api/appdetails?appids=${app.appid}&cc=br&l=portuguese`;
        const detailResponse = await axios.get(detailUrl);
        const data = detailResponse.data[app.appid];

        if (!data.success) return null;

        const info = data.data;

        return {
          id: info.steam_appid,
          title: info.name,
          price: info.price_overview
            ? (info.price_overview.final / 100).toFixed(2)
            : info.is_free
            ? "Gratuito"
            : "Indisponível",
          image: info.header_image,
          category: info.genres ? info.genres.map((g) => g.description).join(", ") : "Desconhecido",
          description: info.short_description || "Sem descrição disponível.",
        };
      } catch (err) {
        return null; // ignora erros de algum jogo sem detalhes
      }
    })
  );

  // Filtra nulls (jogos sem detalhes válidos)
  return produtosList.filter(Boolean);
}

// Função para pegar um jogo específico pelo ID
export async function getProdutoById(id) {
  const detailUrl = `https://store.steampowered.com/api/appdetails?appids=${id}&cc=br&l=portuguese`;
  const response = await axios.get(detailUrl);
  const data = response.data[id];

  if (!data.success) throw new Error("Jogo não encontrado");

  const info = data.data;
  return {
    id: info.steam_appid,
    title: info.name,
    price: info.price_overview
      ? (info.price_overview.final / 100).toFixed(2)
      : info.is_free
      ? "Gratuito" 
      : "Indisponível",
    image: info.header_image,
    category: info.genres ? info.genres.map((g) => g.description).join(", ") : "Desconhecido",
    description: info.short_description || "Sem descrição disponível.",
  };
}
