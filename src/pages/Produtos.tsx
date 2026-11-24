import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Filter, Grid, List, ShoppingCart, Heart, ChevronLeft, ChevronRight, ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProducts } from "@/hooks/use-products";
import { ProductsStatus } from "@/components/ProductsStatus";
import { Product, formatPrice } from "@/services/products";

const categories = [
  { id: "all", name: "Todos" },
  { id: "carretinha", name: "Carretinhas" },
  { id: "acessorios", name: "Acessórios" },
];

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

const Produtos = () => {
  const { data = [], isLoading, isError, refetch } = useProducts();
  const products = data.filter((p) => p.category !== "opcional");
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

  const getCurrentImage = (product: Product) => {
    const currentIndex = productImages[product.id] || 0;
    return product.images[currentIndex] || product.images[0];
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

          <ProductsStatus isLoading={isLoading} isError={isError} onRetry={refetch} />

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
                  onTouchStart={(e) => product.images.length > 1 && onTouchStart(e, product.id)}
                  onTouchMove={(e) => product.images.length > 1 && onTouchMove(e, product.id)}
                  onTouchEnd={() => product.images.length > 1 && onTouchEnd(product.id, product.images.length)}
                >
                  <img
                    src={getCurrentImage(product)}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 pointer-events-none bg-muted"
                    draggable={false}
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Heart className="w-4 h-4 text-foreground" />
                  </button>
                  {/* Navigation buttons for products with multiple images */}
                  {(product.images.length > 1) && (
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
                    {product.highlights.slice(0, 2).map((spec, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-accent rounded-full" />
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div>
                      {product.priceVariations.length > 0 && (
                        <span className="block text-xs text-muted-foreground">A partir de</span>
                      )}
                      <span className="font-display text-xl font-bold text-foreground">
                        R$ {formatPrice(product.price)}
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
