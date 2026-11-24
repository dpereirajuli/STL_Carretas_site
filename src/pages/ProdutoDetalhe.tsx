import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/use-products";
import { ProductsStatus } from "@/components/ProductsStatus";
import { Product, formatPrice } from "@/services/products";

const ProdutoDetalhe = () => {
  const { id } = useParams();
  const { data = [], isLoading, isError, refetch } = useProducts();
  const product = data.find((p) => p.id === Number(id) && p.category !== "opcional");

  if (!product) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-custom">
            <ProductsStatus isLoading={isLoading} isError={isError} onRetry={refetch} />
            {!isLoading && !isError && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-3">Produto não encontrado.</p>
                <Link to="/produtos" className="text-accent font-semibold hover:underline">
                  Ver todos os produtos
                </Link>
              </div>
            )}
          </div>
        </section>
      </Layout>
    );
  }

  const accessories = product.accessoryIds
    .map((accId) => data.find((p) => p.id === accId))
    .filter((p): p is Product => p !== undefined);

  // key: zera imagem, quantidade e seleções ao trocar de produto
  return <ProdutoConteudo key={product.id} product={product} accessories={accessories} />;
};

interface ProdutoConteudoProps {
  product: Product;
  accessories: Product[];
}

const ProdutoConteudo = ({ product, accessories }: ProdutoConteudoProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [selectedPriceVariation, setSelectedPriceVariation] = useState(0);

  const { priceVariations } = product;
  const currentVariation = priceVariations[selectedPriceVariation] ?? priceVariations[0];

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
    const acc = accessories.find((a) => a.id === accId);
    return sum + (acc?.price || 0);
  }, 0);

  // Usar o preço da variação selecionada se houver, senão usar o preço base
  const currentPrice = currentVariation ? currentVariation.price : product.price;

  const total = (currentPrice + accessoriesTotal) * quantity;

  const handleAddToCart = () => {
    const selectedAccessoriesData = accessories
      .filter((acc) => selectedAccessories.includes(acc.id))
      .map(({ id, name, price }) => ({ id, name, price }));

    addToCart({
      id: product.id,
      name: product.name,
      price: currentPrice,
      quantity: quantity,
      image: product.images[0],
      selectedAccessories: selectedAccessoriesData,
      priceVariation: currentVariation,
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

              {product.highlights.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {product.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display text-4xl font-bold text-foreground">
                  R$ {formatPrice(currentPrice)}
                </span>
              </div>

              {/* Price Variations */}
              {priceVariations.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-display font-bold text-foreground mb-3">
                    Escolha a opção
                  </h3>
                  <div className="space-y-2">
                    {priceVariations.map((variation, index) => (
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
                          R$ {formatPrice(variation.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Accessories */}
              {accessories.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-display font-bold text-foreground mb-3">
                    Adicionar Acessórios
                  </h3>
                  <div className="space-y-2">
                    {accessories.map((acc) => (
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
                            {acc.summary && (
                              <span className="text-xs text-muted-foreground block mt-0.5">{acc.summary}</span>
                            )}
                          </div>
                        </div>
                        <span className="text-accent font-semibold flex-shrink-0 ml-3">+R$ {formatPrice(acc.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                  Adicionar - R$ {formatPrice(total)}
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
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
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
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-foreground">
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
