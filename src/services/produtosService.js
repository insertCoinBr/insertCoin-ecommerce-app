import axios from "axios";

export async function getProdutosList() {
  const response = await axios.get("https://fakestoreapi.com/products");
  const produtosList = response.data;
  return produtosList.map((produto) => ({
    id: produto.id,
    title: produto.title,
    price: produto.price,
    image: produto.image,
    category: produto.category,
    description: produto.description,
  }));
}

export async function getProdutoById(id) {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  const produto = response.data;
  return {
    id: produto.id,
    title: produto.title,
    price: produto.price,
    image: produto.image,
    category: produto.category,
    description: produto.description,
  };
}