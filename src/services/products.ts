import { supabase } from "@/lib/supabase";

export interface PriceVariation {
  name: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  summary: string;
  price: number;
  category: string;
  images: string[];
  highlights: string[];
  specs: { label: string; value: string }[];
  features: string[];
  priceVariations: PriceVariation[];
  accessoryIds: number[];
  featured: boolean;
  promotion: boolean;
}

interface ProductRow {
  codigo: number;
  nome: string;
  descricao: string;
  resumo: string;
  valor: number;
  categoria: string;
  imagens: string[];
  destaques: string[];
  especificacoes: { label: string; value: string }[];
  caracteristicas: string[];
  variacoes_preco: { nome: string; valor: number }[];
  acessorios: number[];
  destaque_home: boolean;
  promocao_home: boolean;
}

// O visitante não tem permissão em todas as colunas, então nada de select("*").
const COLUMNS =
  "codigo,nome,descricao,resumo,valor,categoria,imagens,destaques,especificacoes,caracteristicas,variacoes_preco,acessorios,destaque_home,promocao_home";

// Com variações, o preço exibido é o da mais barata ("A partir de").
const basePrice = (row: ProductRow) =>
  row.variacoes_preco.length > 0
    ? Math.min(...row.variacoes_preco.map((v) => Number(v.valor)))
    : Number(row.valor);

const fromRow = (row: ProductRow): Product => ({
  id: row.codigo,
  name: row.nome,
  description: row.descricao,
  summary: row.resumo,
  price: basePrice(row),
  category: row.categoria,
  images: row.imagens.length > 0 ? row.imagens : ["/placeholder.svg"],
  highlights: row.destaques,
  specs: row.especificacoes,
  features: row.caracteristicas,
  priceVariations: row.variacoes_preco.map((v) => ({ name: v.nome, price: Number(v.valor) })),
  accessoryIds: row.acessorios,
  featured: row.destaque_home,
  promotion: row.promocao_home,
});

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("produtos_catalogo")
    .select(COLUMNS)
    .eq("publicado_site", true)
    .order("codigo");
  if (error) throw error;
  return (data as ProductRow[]).map(fromRow);
};

export const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
