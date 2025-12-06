import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Filter, Grid, List, ShoppingCart, Heart, ChevronLeft, ChevronRight, ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

const products = [
  {
    id: 7,
    name: "Carretinha prancha",
    category: "carretinha",
    price: 3900,
    image: carretaPrancha,
    rating: 5,
    reviews: 0,
    specs: ["Todos os tamanhos", "Mais de um eixo", "Prancha resistente"],
  },
  {
    id: 8,
    name: "Reboque 2 eixos",
    category: "carretinha",
    price: 6500,
    image: carretaPrancha2Eixos,
    images: [carretaPrancha2Eixos, carretaPrancha2Eixos1, carretaPrancha2Eixos2],
    rating: 5,
    reviews: 0,
    specs: ["2.00 x 1.20", "2 eixos", "Fazemos sob medida", "Ideal para Paredão e carregamentos"],
  },
  {
    id: 9,
    name: "Plataforma guincho",
    category: "carretinha",
    price: 15000,
    image: plataforma,
    images: [plataforma, plataforma2, plataforma3, plataforma4],
    rating: 5,
    reviews: 0,
    specs: ["4.00 x 2.00", "Capacidade: 2.500 kg", "Fazemos sob medida", "Até 3.500 kg"],
  },
  {
    id: 10,
    name: "ASA DELTA PARA 1 CARRO E 1 MOTO",
    category: "carretinha",
    price: 4500,
    image: carretinha,
    images: [carretinha, carretinha2],
    rating: 5,
    reviews: 0,
    specs: ["Para 1 carro e 1 moto", "Guincho manual/elétrico", "Com ou sem emplacamento", "A partir de R$ 4.500"],
  },
  {
    id: 11,
    name: "ASA DELTA PARA CARRO E ATÉ 3 MOTOS",
    category: "carretinha",
    price: 5800,
    image: carretinha1Png,
    images: [carretinha1Png, carretinha2Jpeg, carretinha2Png, carretinha3Png],
    rating: 5,
    reviews: 0,
    specs: ["Para 1 carro e até 3 motos", "Guincho manual/elétrico", "Com ou sem emplacamento", "A partir de R$ 5.800"],
  },
  {
    id: 12,
    name: "Carretinha plataforma com freio",
    category: "carretinha",
    price: 21000,
    image: plataformaFreio,
    images: [plataformaFreio, plataformaFreio2],
    rating: 5,
    reviews: 0,
    specs: ["Plataforma robusta", "Sistema de freio", "Alta capacidade", "Estrutura reforçada"],
  },
  {
    id: 13,
    name: "Guincho Manual",
    category: "acessorios",
    price: 300,
    image: guinchoManual,
    images: [guinchoManual, guinchoManual2, guinchoManual3],
    rating: 5,
    reviews: 0,
    specs: ["Catraca Cinta 10m", "Capacidade até 1130kg", "Guincho manual", "Alta resistência"],
  },
  {
    id: 14,
    name: "Guincho Elétrico 1361 Kg 12 Volts",
    category: "acessorios",
    price: 700,
    image: guinchoEletrico,
    images: [guinchoEletrico, guinchoEletrico2, guinchoEletrico3],
    rating: 5,
    reviews: 0,
    specs: ["Capacidade: 1361 kg", "12 Volts", "Guincho elétrico", "Alta performance"],
  },
  {
    id: 15,
    name: "Cinta catraca (o par)",
    category: "acessorios",
    price: 160,
    image: cinta,
    images: [cinta],
    rating: 5,
    reviews: 0,
    specs: ["Cinta reforçada", "Suporta 1000 kg a 3,5 toneladas", "Par de cintas", "Alta resistência"],
  },
  {
    id: 16,
    name: "Corrente com cadeado",
    category: "acessorios",
    price: 90,
    image: corrente,
    images: [corrente],
    rating: 5,
    reviews: 0,
    specs: ["Uso obrigatório", "Corrente reforçada", "Cadeado incluído", "Segurança"],
  },
  {
    id: 17,
    name: "Suporte para bateria individual para o guincho elétrico",
    category: "acessorios",
    price: 250,
    image: suporteBateria,
    images: [suporteBateria, suporteBateria2],
    rating: 5,
    reviews: 0,
    specs: ["Suporte para bateria", "Individual para guincho elétrico", "Independência do veículo", "Alta qualidade"],
  },
  {
    id: 18,
    name: "Regularização, Homologação e Emplacamento",
    category: "acessorios",
    price: 1500,
    image: documentacao,
    images: [documentacao],
    rating: 5,
    reviews: 0,
    specs: ["Homologação", "Emplacamento", "Regularização", "Registro no Detran"],
  },
  {
    id: 19,
    name: "Sinalizador giroled",
    category: "acessorios",
    price: 300,
    image: giroled,
    images: [giroled, exemploGiroled],
    rating: 5,
    reviews: 0,
    specs: ["LED", "Instalado", "Sinalizador", "Alta visibilidade"],
  },
  {
    id: 20,
    name: "Sistema de freio à disco já instalado",
    category: "acessorios",
    price: 3000,
    image: freio,
    images: [freio],
    rating: 5,
    reviews: 0,
    specs: ["Freio à disco", "Já instalado", "Sistema completo", "Alta segurança"],
  },
  {
    id: 21,
    name: "Pé de apoio",
    category: "acessorios",
    price: 130,
    image: apoio,
    images: [apoio, apoio2, apoio3],
    rating: 5,
    reviews: 0,
    specs: ["Estabilização", "Nivelamento", "Ajustável", "Alta resistência"],
  },
];

const categories = [
  { id: "all", name: "Todos" },
  { id: "carretinha", name: "Carretinhas" },
  { id: "acessorios", name: "Acessórios" },
];

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

const Produtos = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [productImages, setProductImages] = useState<Record<number, number>>({});
  const [sortOrder, setSortOrder] = useState<SortOption>("name-asc");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Aplicar ordenação
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.name.localeCompare(b.name, "pt-BR");
      case "name-desc":
        return b.name.localeCompare(a.name, "pt-BR");
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const [touchStart, setTouchStart] = useState<Record<number, number | null>>({});
  const [touchEnd, setTouchEnd] = useState<Record<number, number | null>>({});

  const getCurrentImage = (product: any) => {
    const currentIndex = productImages[product.id] || 0;
    const images = product.images || [product.image];
    return images[currentIndex] || product.image;
  };

  const nextImage = (productId: number, totalImages: number) => {
    setProductImages(prev => {
      const current = prev[productId] || 0;
      return { ...prev, [productId]: (current + 1) % totalImages };
    });
  };

  const prevImage = (productId: number, totalImages: number) => {
    setProductImages(prev => {
      const current = prev[productId] || 0;
      return { ...prev, [productId]: (current - 1 + totalImages) % totalImages };
    });
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent, productId: number) => {
    setTouchEnd(prev => ({ ...prev, [productId]: null }));
    setTouchStart(prev => ({ ...prev, [productId]: e.targetTouches[0].clientX }));
  };

  const onTouchMove = (e: React.TouchEvent, productId: number) => {
    setTouchEnd(prev => ({ ...prev, [productId]: e.targetTouches[0].clientX }));
  };

  const onTouchEnd = (productId: number, totalImages: number) => {
    if (!touchStart[productId] || !touchEnd[productId]) return;
    
    const distance = touchStart[productId]! - touchEnd[productId]!;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage(productId, totalImages);
    }
    if (isRightSwipe) {
      prevImage(productId, totalImages);
    }
  };

  return (
    <Layout>
      {/* Filters & Products */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all",
                    activeCategory === cat.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* View Toggle & Sort */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-muted-foreground text-sm">
                {filteredProducts.length} produtos
              </span>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOption)}
                  className="appearance-none bg-muted border border-border rounded-lg px-4 py-2 pr-8 text-sm font-medium text-foreground cursor-pointer hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="name-asc">A-Z</option>
                  <option value="name-desc">Z-A</option>
                  <option value="price-asc">Menor Valor</option>
                  <option value="price-desc">Maior Valor</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              <div className="flex gap-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "grid" ? "bg-card shadow-sm" : "text-muted-foreground"
                  )}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "list" ? "bg-card shadow-sm" : "text-muted-foreground"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={cn(
            "grid gap-6",
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          )}>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={cn(
                  "group card-product bg-card border border-border",
                  viewMode === "list" && "flex flex-row"
                )}
              >
                {/* Image */}
                <div 
                  className={cn(
                    "relative overflow-hidden cursor-grab active:cursor-grabbing select-none",
                    viewMode === "grid" ? "aspect-[4/3]" : "w-48 flex-shrink-0"
                  )}
                  onTouchStart={(e) => product.images && product.images.length > 1 && onTouchStart(e, product.id)}
                  onTouchMove={(e) => product.images && product.images.length > 1 && onTouchMove(e, product.id)}
                  onTouchEnd={() => product.images && product.images.length > 1 && onTouchEnd(product.id, product.images.length)}
                >
                  <img
                    src={getCurrentImage(product)}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 pointer-events-none bg-muted"
                    draggable={false}
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full z-10">
                      {product.badge}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Heart className="w-4 h-4 text-foreground" />
                  </button>
                  {/* Navigation buttons for products with multiple images */}
                  {(product.images && product.images.length > 1) && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          prevImage(product.id, product.images.length);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card z-10"
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft className="w-4 h-4 text-foreground" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          nextImage(product.id, product.images.length);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card z-10"
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight className="w-4 h-4 text-foreground" />
                      </button>
                      {/* Image indicators */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        {product.images.map((_: any, index: number) => {
                          const currentIndex = productImages[product.id] || 0;
                          return (
                            <div
                              key={index}
                              className={cn(
                                "w-1.5 h-1.5 rounded-full transition-all",
                                currentIndex === index ? "bg-accent w-4" : "bg-card/60"
                              )}
                            />
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1">

                  <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>

                  <ul className="space-y-1 mb-4">
                    {product.specs.slice(0, 2).map((spec) => (
                      <li key={spec} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-accent rounded-full" />
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through mr-2">
                          R$ {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="font-display text-xl font-bold text-foreground">
                        R$ {product.price.toLocaleString()}
                      </span>
                    </div>
                    <Link to={`/produtos/${product.category}/${product.id}`}>
                      <Button size="sm" className="btn-accent">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Produtos;
