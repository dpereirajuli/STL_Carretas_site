import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import carretaPrancha from "@/assets/carreta_prancha.jpeg";
import carretaPrancha2Eixos from "@/assets/carreta_prancha_2eixos.jpeg";
import carretaPrancha2Eixos1 from "@/assets/carreta_prancha_2eixos_1.jpeg";
import carretaPrancha2Eixos2 from "@/assets/carreta_prancha_2eixos_2.jpeg";
import guinchoManual from "@/assets/guincho_manual.jpeg";
import guinchoManual2 from "@/assets/guicho_manual2.png";
import guinchoManual3 from "@/assets/guincho_manual3.png";
import guinchoEletrico from "@/assets/guincho_eletrico.jpeg";
import guinchoEletrico2 from "@/assets/guincho_eletrico2.png";
import guinchoEletrico3 from "@/assets/guincho_eletrico3.jpeg";
import cinta from "@/assets/cinta.jpeg";
import corrente from "@/assets/corrente.jpeg";
import suporteBateria from "@/assets/suporte_bateria.jpeg";
import suporteBateria2 from "@/assets/suporte_bateria.png";
import documentacao from "@/assets/documentacao.jpeg";
import giroled from "@/assets/giroled.jpeg";
import exemploGiroled from "@/assets/exemplo_giroled.jpeg";
import freio from "@/assets/freio.jpeg";
import apoio from "@/assets/apoio.jpeg";
import apoio2 from "@/assets/apoio2.jpeg";
import apoio3 from "@/assets/apoio3.jpeg";
import plataforma from "@/assets/Plataforma.jpeg";
import plataforma2 from "@/assets/Plataforma2.jpeg";
import plataforma3 from "@/assets/Plataforma3.jpeg";
import plataforma4 from "@/assets/Plataforma4.jpeg";
import carretinha from "@/assets/carretinha.jpeg";
import carretinha2 from "@/assets/carretinha2.jpeg";
import carretinha1Png from "@/assets/carretinha1.png";
import carretinha2Png from "@/assets/carretinha2.png";
import carretinha2Jpeg from "@/assets/carretinha2.jpeg";
import carretinha3Png from "@/assets/carretinha3.png";
import plataformaFreio from "@/assets/plataformaFreio.png";
import plataformaFreio2 from "@/assets/plataformaFreio2.png";

const productsData: Record<number, any> = {
  7: {
    id: 7,
    name: "Carretinha prancha",
    price: 3900,
    description: "Carretinha prancha, trabalhamos com todos tamanhos e mais de um eixo.",
    images: [carretaPrancha, carretaPrancha, carretaPrancha],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Tamanhos", value: "Todos os tamanhos" },
      { label: "Eixos", value: "Mais de um eixo" },
      { label: "Tipo", value: "Prancha resistente" },
      { label: "Pneus", value: "Remold" },
    ],
    features: [
      "Todos os tamanhos disponíveis",
      "Mais de um eixo",
      "Prancha resistente",
      "Estrutura robusta",
    ],
    accessories: [
      { id: 20, name: "Sistema de freio à disco já instalado", price: 3000, description: "Sistema de freio à disco completo já instalado" },
      { id: 19, name: "Sinalizador giroled", price: 300, description: "Sinalizador LED instalado para maior visibilidade" },
      { id: 15, name: "Cinta catraca (o par)", price: 160, description: "Cinta reforçada que suporta de 1000 kg a 3 toneladas e meia" },
      { id: 16, name: "Corrente com cadeado", price: 90, description: "Uso obrigatório para segurança no transporte" },
      { id: 21, name: "Pé de apoio", price: 130, description: "Ideal para estabilizar e nivelar carretinhas quando desacopladas" },
      { id: 17, name: "Suporte para bateria individual para o guincho elétrico", price: 250, description: "Use uma bateria exclusiva para seu guincho elétrico" },
      { id: 100, name: "Guincho elétrico", price: 450, description: "Guincho elétrico adicional para facilitar o carregamento" },
      { id: 101, name: "Guincho manual", price: 300, description: "Guincho manual para carregamento de veículos" },
      { id: 102, name: "Pneus novos", price: 140, description: "Pneus novos - R$ 140,00 por unidade de cada pneu (substitui os pneus Remold incluídos)" },
    ],
  },
  8: {
    id: 8,
    name: "Reboque 2 eixos",
    price: 6500,
    description: "Reboque 2 eixos com dimensões 2.00 x 1.20. Fazemos também sob medida. Ideal para Paredão, carregamentos, etc.",
    images: [carretaPrancha2Eixos, carretaPrancha2Eixos1, carretaPrancha2Eixos2],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Dimensões", value: "2.00 x 1.20" },
      { label: "Eixos", value: "2 eixos" },
      { label: "Personalização", value: "Fazemos sob medida" },
      { label: "Uso", value: "Ideal para Paredão e carregamentos" },
      { label: "Pneus", value: "Remold" },
    ],
    features: [
      "2 eixos para maior estabilidade",
      "Fabricação sob medida",
      "Ideal para Paredão",
      "Perfeito para carregamentos",
      "Estrutura resistente",
      "Prancha de qualidade",
    ],
    accessories: [
      { id: 20, name: "Sistema de freio à disco já instalado", price: 3000, description: "Sistema de freio à disco completo já instalado" },
      { id: 19, name: "Sinalizador giroled", price: 300, description: "Sinalizador LED instalado para maior visibilidade" },
      { id: 15, name: "Cinta catraca (o par)", price: 160, description: "Cinta reforçada que suporta de 1000 kg a 3 toneladas e meia" },
      { id: 16, name: "Corrente com cadeado", price: 90, description: "Uso obrigatório para segurança no transporte" },
      { id: 21, name: "Pé de apoio", price: 130, description: "Ideal para estabilizar e nivelar carretinhas quando desacopladas" },
      { id: 17, name: "Suporte para bateria individual para o guincho elétrico", price: 250, description: "Use uma bateria exclusiva para seu guincho elétrico" },
      { id: 100, name: "Guincho elétrico", price: 450, description: "Guincho elétrico adicional para facilitar o carregamento" },
      { id: 101, name: "Guincho manual", price: 300, description: "Guincho manual para carregamento de veículos" },
      { id: 102, name: "Pneus novos", price: 140, description: "Pneus novos - R$ 140,00 por unidade de cada pneu (substitui os pneus Remold incluídos)" },
    ],
  },
  9: {
    id: 9,
    name: "Plataforma guincho",
    price: 15000,
    description: "Plataforma guincho com medidas 4,00 x 2,00 e capacidade de carga de 2.500 kg. Fazemos também sob medida e para capacidade de até 3.500 kg.",
    images: [plataforma, plataforma2, plataforma3, plataforma4],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Medidas", value: "4,00 x 2,00" },
      { label: "Capacidade de Carga", value: "2.500 kg" },
      { label: "Personalização", value: "Fazemos sob medida" },
      { label: "Capacidade Máxima", value: "Até 3.500 kg" },
      { label: "Pneus", value: "Remold" },
    ],
    features: [
      "Plataforma guincho robusta",
      "Capacidade de 2.500 kg",
      "Fabricação sob medida disponível",
      "Suporta até 3.500 kg (sob medida)",
      "Estrutura reforçada",
      "Ideal para transporte de veículos",
    ],
    accessories: [
      { id: 20, name: "Sistema de freio à disco já instalado", price: 3000, description: "Sistema de freio à disco completo já instalado" },
      { id: 19, name: "Sinalizador giroled", price: 300, description: "Sinalizador LED instalado para maior visibilidade" },
      { id: 15, name: "Cinta catraca (o par)", price: 160, description: "Cinta reforçada que suporta de 1000 kg a 3 toneladas e meia" },
      { id: 16, name: "Corrente com cadeado", price: 90, description: "Uso obrigatório para segurança no transporte" },
      { id: 21, name: "Pé de apoio", price: 130, description: "Ideal para estabilizar e nivelar carretinhas quando desacopladas" },
      { id: 17, name: "Suporte para bateria individual para o guincho elétrico", price: 250, description: "Use uma bateria exclusiva para seu guincho elétrico" },
      { id: 102, name: "Pneus novos", price: 140, description: "Pneus novos - R$ 140,00 por unidade de cada pneu (substitui os pneus Remold incluídos)" },
    ],
  },
  10: {
    id: 10,
    name: "ASA DELTA PARA 1 CARRO E 1 MOTO",
    price: 4500,
    description: "ASA DELTA para transporte de 1 carro e 1 moto. Disponível com guincho manual ou elétrico de 1.300 kg, com ou sem emplacamento. Preços variam conforme a configuração escolhida.",
    images: [carretinha, carretinha2],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Capacidade", value: "1 carro e 1 moto" },
      { label: "Preço Base", value: "R$ 4.500,00" },
      { label: "Guincho Manual", value: "Incluído" },
      { label: "Guincho Elétrico", value: "1.300 kg (opcional)" },
      { label: "Pneus", value: "Remold" },
    ],
    features: [
      "Transporta 1 carro e 1 moto simultaneamente",
      "Guincho manual incluído",
      "Opção de guincho elétrico de 1.300 kg",
      "Disponível com ou sem emplacamento",
      "Estrutura robusta e segura",
      "Design ASA DELTA",
    ],
    accessories: [
      { id: 20, name: "Sistema de freio à disco já instalado", price: 3000, description: "Sistema de freio à disco completo já instalado" },
      { id: 19, name: "Sinalizador giroled", price: 300, description: "Sinalizador LED instalado para maior visibilidade" },
      { id: 15, name: "Cinta catraca (o par)", price: 160, description: "Cinta reforçada que suporta de 1000 kg a 3 toneladas e meia" },
      { id: 16, name: "Corrente com cadeado", price: 90, description: "Uso obrigatório para segurança no transporte" },
      { id: 21, name: "Pé de apoio", price: 130, description: "Ideal para estabilizar e nivelar carretinhas quando desacopladas" },
      { id: 17, name: "Suporte para bateria individual para o guincho elétrico", price: 250, description: "Use uma bateria exclusiva para seu guincho elétrico" },
      { id: 102, name: "Pneus novos", price: 140, description: "Pneus novos - R$ 140,00 por unidade de cada pneu (substitui os pneus Remold incluídos)" },
    ],
    priceVariations: [
      { name: "Sem emplacamento com guincho manual", price: 4500 },
      { name: "Sem emplacamento com guincho elétrico de 1.300 kg", price: 4700 },
      { name: "Emplacada com guincho manual", price: 5100 },
      { name: "Emplacada com guincho elétrico de 1.300 kg", price: 5550 },
    ],
  },
  11: {
    id: 11,
    name: "ASA DELTA PARA CARRO E ATÉ 3 MOTOS",
    price: 5800,
    description: "ASA DELTA para transporte de 1 carro e até 3 motos. Disponível com guincho manual ou elétrico de 1.300 kg, com ou sem emplacamento. Preços variam conforme a configuração escolhida.",
    images: [carretinha1Png, carretinha2Jpeg, carretinha2Png, carretinha3Png],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Capacidade", value: "1 carro e até 3 motos" },
      { label: "Preço Base", value: "R$ 5.800,00" },
      { label: "Guincho Manual", value: "Incluído" },
      { label: "Guincho Elétrico", value: "1.300 kg (opcional)" },
      { label: "Pneus", value: "Remold" },
    ],
    features: [
      "Transporta 1 carro e até 3 motos simultaneamente",
      "Guincho manual incluído",
      "Opção de guincho elétrico de 1.300 kg",
      "Disponível com ou sem emplacamento",
      "Estrutura robusta e segura",
      "Design ASA DELTA",
      "Maior capacidade de transporte",
    ],
    accessories: [
      { id: 20, name: "Sistema de freio à disco já instalado", price: 3000, description: "Sistema de freio à disco completo já instalado" },
      { id: 19, name: "Sinalizador giroled", price: 300, description: "Sinalizador LED instalado para maior visibilidade" },
      { id: 15, name: "Cinta catraca (o par)", price: 160, description: "Cinta reforçada que suporta de 1000 kg a 3 toneladas e meia" },
      { id: 16, name: "Corrente com cadeado", price: 90, description: "Uso obrigatório para segurança no transporte" },
      { id: 21, name: "Pé de apoio", price: 130, description: "Ideal para estabilizar e nivelar carretinhas quando desacopladas" },
      { id: 17, name: "Suporte para bateria individual para o guincho elétrico", price: 250, description: "Use uma bateria exclusiva para seu guincho elétrico" },
      { id: 102, name: "Pneus novos", price: 140, description: "Pneus novos - R$ 140,00 por unidade de cada pneu (substitui os pneus Remold incluídos)" },
    ],
    priceVariations: [
      { name: "Sem emplacamento com guincho manual", price: 5800 },
      { name: "Sem emplacamento com guincho elétrico 1.300 kg", price: 6000 },
      { name: "Emplacada com guincho manual", price: 6400 },
      { name: "Emplacada com guincho elétrico 1.300 kg", price: 6800 },
    ],
  },
  12: {
    id: 12,
    name: "Carretinha plataforma com freio",
    price: 21000,
    description: "Carretinha plataforma com sistema de freio, ideal para transporte seguro de veículos e cargas pesadas. Estrutura robusta e sistema de freio para máxima segurança.",
    images: [plataformaFreio, plataformaFreio2],
  rating: 5,
    reviews: 0,
  inStock: true,
  specs: [
      { label: "Tipo", value: "Plataforma" },
    { label: "Sistema de Freio", value: "Incluído" },
      { label: "Estrutura", value: "Reforçada" },
      { label: "Preço", value: "R$ 21.000,00" },
      { label: "Pneus", value: "Remold" },
  ],
  features: [
      "Plataforma robusta e resistente",
      "Sistema de freio para segurança",
      "Estrutura reforçada",
      "Alta capacidade de carga",
      "Ideal para transporte de veículos",
      "Acabamento de qualidade",
  ],
  accessories: [
    { id: 19, name: "Sinalizador giroled", price: 300, description: "Sinalizador LED instalado para maior visibilidade" },
    { id: 15, name: "Cinta catraca (o par)", price: 160, description: "Cinta reforçada que suporta de 1000 kg a 3 toneladas e meia" },
    { id: 16, name: "Corrente com cadeado", price: 90, description: "Uso obrigatório para segurança no transporte" },
    { id: 21, name: "Pé de apoio", price: 130, description: "Ideal para estabilizar e nivelar carretinhas quando desacopladas" },
    { id: 17, name: "Suporte para bateria individual para o guincho elétrico", price: 250, description: "Use uma bateria exclusiva para seu guincho elétrico" },
    { id: 102, name: "Pneus novos", price: 140, description: "Pneus novos por unidade (substitui os pneus Remold incluídos)" },
  ],
  },
  13: {
    id: 13,
    name: "Guincho Manual",
    price: 300,
    description: "Guincho Manual Catraca Cinta 10m com capacidade para até 1130kg. Ideal para transporte seguro de veículos e cargas.",
    images: [guinchoManual, guinchoManual2, guinchoManual3],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Tipo", value: "Guincho Manual" },
      { label: "Capacidade", value: "Até 1130 kg" },
      { label: "Cinta", value: "10 metros" },
      { label: "Sistema", value: "Catraca" },
    ],
    features: [
      "Guincho manual com catraca",
      "Cinta de 10 metros",
      "Capacidade até 1130 kg",
      "Alta resistência",
      "Fácil de usar",
      "Seguro e confiável",
    ],
    accessories: [],
  },
  14: {
    id: 14,
    name: "Guincho Elétrico 1361 Kg 12 Volts",
    price: 700,
    description: "Guincho Elétrico com capacidade de 1361 kg, alimentado por 12 Volts. Ideal para transporte pesado com praticidade e segurança.",
    images: [guinchoEletrico, guinchoEletrico2, guinchoEletrico3],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Tipo", value: "Guincho Elétrico" },
      { label: "Capacidade", value: "1361 kg" },
      { label: "Voltagem", value: "12 Volts" },
      { label: "Preço", value: "R$ 700,00" },
    ],
    features: [
      "Guincho elétrico de alta performance",
      "Capacidade de 1361 kg",
      "Alimentação 12 Volts",
      "Operação elétrica",
      "Alta durabilidade",
      "Ideal para uso pesado",
    ],
    accessories: [],
  },
  15: {
    id: 15,
    name: "Cinta catraca (o par)",
    price: 160,
    description: "Cinta reforçada que suporta de 1000 kg a 3 toneladas e meia. Par de cintas com catraca para amarração segura de cargas.",
    images: [cinta],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Tipo", value: "Cinta Catraca" },
      { label: "Quantidade", value: "Par (2 unidades)" },
      { label: "Capacidade", value: "1000 kg a 3,5 toneladas" },
      { label: "Preço", value: "R$ 160,00" },
    ],
    features: [
      "Cinta reforçada de alta qualidade",
      "Suporta de 1000 kg a 3,5 toneladas",
      "Par de cintas incluído",
      "Sistema de catraca",
      "Alta resistência",
      "Ideal para amarração de cargas",
    ],
    accessories: [],
  },
  16: {
    id: 16,
    name: "Corrente com cadeado",
    price: 90,
    description: "Corrente com cadeado de uso obrigatório para segurança no transporte. Item essencial para garantir a segurança da carga.",
    images: [corrente],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Tipo", value: "Corrente com Cadeado" },
      { label: "Uso", value: "Obrigatório" },
      { label: "Cadeado", value: "Incluído" },
      { label: "Preço", value: "R$ 90,00" },
    ],
    features: [
      "Corrente reforçada",
      "Cadeado incluído",
      "Uso obrigatório",
      "Alta segurança",
      "Resistente à corrosão",
      "Ideal para fixação segura",
    ],
    accessories: [],
  },
  17: {
    id: 17,
    name: "Suporte para bateria individual para o guincho elétrico",
    price: 250,
    description: "Suporte para bateria individual de guincho elétrico. Use uma bateria exclusiva para seu guincho elétrico sem necessidade de usar a do seu carro. Sua asa delta não fica dependente de guinchar em um único veículo.",
    images: [suporteBateria, suporteBateria2],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Tipo", value: "Suporte para Bateria" },
      { label: "Uso", value: "Guincho elétrico individual" },
      { label: "Independência", value: "Não depende do veículo" },
      { label: "Preço", value: "R$ 250,00" },
    ],
    features: [
      "Suporte para bateria individual",
      "Use bateria exclusiva para guincho elétrico",
      "Sem necessidade de usar bateria do carro",
      "Asa delta não depende de um único veículo",
      "Estrutura robusta",
      "Fácil instalação",
    ],
    accessories: [],
  },
  18: {
    id: 18,
    name: "Regularização, Homologação e Emplacamento",
    price: 1500,
    description: "Assim como carros e motos, os reboques precisam ser registrados no Detran. Fazemos homologação, emplacamento e regularização de reboque.",
    images: [documentacao],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Serviço", value: "Regularização completa" },
      { label: "Homologação", value: "Incluída" },
      { label: "Emplacamento", value: "Incluído" },
      { label: "Registro", value: "Detran" },
    ],
    features: [
      "Homologação de reboque",
      "Emplacamento completo",
      "Regularização no Detran",
      "Registro obrigatório",
      "Documentação completa",
      "Serviço completo e profissional",
    ],
    accessories: [],
  },
  19: {
    id: 19,
    name: "Sinalizador giroled",
    price: 300,
    description: "Sinalizador giroled LED instalado. Alta visibilidade e segurança para seu reboque ou carretinha.",
    images: [giroled, exemploGiroled],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Tipo", value: "Sinalizador LED" },
      { label: "Instalação", value: "Incluída" },
      { label: "Tecnologia", value: "LED" },
      { label: "Preço", value: "R$ 300,00 instalado" },
    ],
    features: [
      "Sinalizador LED giroled",
      "Instalação incluída",
      "Alta visibilidade",
      "Tecnologia LED",
      "Segurança no trânsito",
      "Durabilidade e eficiência",
    ],
    accessories: [],
  },
  20: {
    id: 20,
    name: "Sistema de freio à disco já instalado",
    price: 3000,
    description: "Sistema de freio à disco completo já instalado. Máxima segurança e eficiência para seu reboque ou carretinha.",
    images: [freio],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Tipo", value: "Freio à Disco" },
      { label: "Instalação", value: "Já instalado" },
      { label: "Sistema", value: "Completo" },
      { label: "Preço", value: "R$ 3.000,00" },
    ],
    features: [
      "Sistema de freio à disco completo",
      "Já instalado e pronto para uso",
      "Máxima segurança",
      "Alta eficiência de frenagem",
      "Sistema hidráulico",
      "Ideal para reboques e carretinhas",
    ],
    accessories: [],
  },
  21: {
    id: 21,
    name: "Pé de apoio",
    price: 130,
    description: "Pé de apoio ideal para estabilizar e nivelar carretinhas quando desacopladas do veículo. Recomendado lubrificar periodicamente as partes móveis para garantir um funcionamento suave.",
    images: [apoio, apoio2, apoio3],
    rating: 5,
    reviews: 0,
    inStock: true,
    specs: [
      { label: "Tipo", value: "Pé de Apoio" },
      { label: "Função", value: "Estabilização e nivelamento" },
      { label: "Ajustável", value: "Sim" },
      { label: "Preço", value: "R$ 130,00" },
    ],
    features: [
      "Ideal para estabilizar carretinhas",
      "Nivelamento quando desacoplado",
      "Altura ajustável",
      "Estrutura resistente",
      "Fácil instalação",
      "Manutenção simples",
    ],
    accessories: [],
  },
};

const ProdutoDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [selectedPriceVariation, setSelectedPriceVariation] = useState<number | null>(null);

  const productId = id ? parseInt(id) : 7;
  const product = productsData[productId] || productsData[7];
  
  const priceVariations = (product as any).priceVariations;
  
  // Inicializar com a primeira opção se houver variações de preço
  useEffect(() => {
    if (priceVariations && priceVariations.length > 0) {
      setSelectedPriceVariation(0);
    } else {
      setSelectedPriceVariation(null);
    }
  }, [productId, priceVariations]);

  // Distância mínima para considerar um swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentImage(prev => prev < product.images.length - 1 ? prev + 1 : 0);
    }
    if (isRightSwipe) {
      setCurrentImage(prev => prev > 0 ? prev - 1 : product.images.length - 1);
    }
  };

  // Para mouse (desktop)
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || mouseStart === null) return;
    const distance = mouseStart - e.clientX;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        setCurrentImage(prev => prev < product.images.length - 1 ? prev + 1 : 0);
      } else {
        setCurrentImage(prev => prev > 0 ? prev - 1 : product.images.length - 1);
      }
      setIsDragging(false);
      setMouseStart(null);
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    setMouseStart(null);
  };

  const toggleAccessory = (accId: number) => {
    setSelectedAccessories(prev =>
      prev.includes(accId) ? prev.filter(id => id !== accId) : [...prev, accId]
    );
  };

  const accessoriesTotal = selectedAccessories.reduce((sum, accId) => {
    const acc = product.accessories.find((a: any) => a.id === accId);
    return sum + (acc?.price || 0);
  }, 0);

  // Usar o preço da variação selecionada se houver, senão usar o preço base
  const currentPrice = priceVariations && selectedPriceVariation !== null
    ? priceVariations[selectedPriceVariation].price
    : product.price;

  const total = (currentPrice + accessoriesTotal) * quantity;

  const handleAddToCart = () => {
    const selectedAccessoriesData = product.accessories.filter((acc: any) =>
      selectedAccessories.includes(acc.id)
    );

    const priceVariation = priceVariations && selectedPriceVariation !== null
      ? priceVariations[selectedPriceVariation]
      : undefined;

    addToCart({
      id: product.id,
      name: product.name,
      price: currentPrice,
      quantity: quantity,
      image: product.images[0],
      selectedAccessories: selectedAccessoriesData,
      priceVariation: priceVariation,
    });

    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="container-custom px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/produtos" className="text-muted-foreground hover:text-foreground">Produtos</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-4 cursor-grab active:cursor-grabbing select-none"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
              >
                <img
                  src={product.images[currentImage]}
                  alt={product.name}
                  className="w-full h-full object-contain pointer-events-none"
                  draggable={false}
                />
                <button
                  onClick={() => setCurrentImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={cn(
                      "flex-1 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-colors",
                      currentImage === i ? "border-accent" : "border-transparent"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain bg-muted" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              <div className="flex items-baseline gap-3 mb-6">
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    R$ {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="font-display text-4xl font-bold text-foreground">
                  R$ {currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {product.originalPrice && (
                  <span className="px-2 py-1 bg-accent/20 text-accent text-sm font-bold rounded">
                    -{Math.round((1 - currentPrice / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Price Variations */}
              {priceVariations && (
                <div className="mb-6">
                  <h3 className="font-display font-bold text-foreground mb-3">
                    Opções de Preço
                  </h3>
                  <div className="space-y-2">
                    {priceVariations.map((variation: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPriceVariation(index)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg border transition-colors text-left",
                          selectedPriceVariation === index
                            ? "border-accent bg-accent/10 ring-2 ring-accent"
                            : "border-border hover:border-accent/50 bg-card"
                        )}
                      >
                        <span className={cn(
                          "text-sm",
                          selectedPriceVariation === index ? "text-foreground font-semibold" : "text-foreground"
                        )}>
                          {variation.name}
                        </span>
                        <span className={cn(
                          "font-display text-lg font-bold",
                          selectedPriceVariation === index ? "text-accent" : "text-accent"
                        )}>
                          R$ {variation.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Accessories */}
              <div className="mb-6">
                <h3 className="font-display font-bold text-foreground mb-3">
                  Adicionar Acessórios
                </h3>
                <div className="space-y-2">
                  {product.accessories.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => toggleAccessory(acc.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg border transition-colors text-left",
                        selectedAccessories.includes(acc.id)
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={cn(
                          "w-5 h-5 rounded border flex items-center justify-center flex-shrink-0",
                          selectedAccessories.includes(acc.id)
                            ? "bg-accent border-accent"
                            : "border-muted-foreground"
                        )}>
                          {selectedAccessories.includes(acc.id) && (
                            <Check className="w-3 h-3 text-accent-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-foreground block">{acc.name}</span>
                          {acc.description && (
                            <span className="text-xs text-muted-foreground block mt-0.5">{acc.description}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-accent font-semibold flex-shrink-0 ml-3">+R$ {acc.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-3 text-foreground hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 font-medium text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-3 text-foreground hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 btn-accent text-lg py-6"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar - R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Button>
              </div>
            </div>
          </div>

          {/* Specs & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Especificações Técnicas
              </h3>
              <div className="space-y-3">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Características
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-foreground">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProdutoDetalhe;
