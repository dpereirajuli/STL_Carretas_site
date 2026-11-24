import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { ProductsStatus } from "@/components/ProductsStatus";
import { formatPrice } from "@/services/products";

export function FeaturedProducts() {
  const { data = [], isLoading, isError, refetch } = useProducts();
  const products = data.filter((p) => p.featured && p.category === "carretinha");

  if (!isLoading && !isError && products.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Destaques
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Produtos em Destaque
            </h2>
          </div>
          <Link
            to="/produtos"
            className="text-accent font-semibold hover:underline"
          >
            Ver todos os produtos →
          </Link>
        </div>

        <ProductsStatus isLoading={isLoading} isError={isError} onRetry={refetch} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group card-product bg-card border border-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 bg-muted"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-xs text-accent font-medium uppercase">
                  {product.category}
                </span>
                
                <h3 className="font-display font-bold text-foreground mt-1 mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {product.priceVariations.length > 0 && (
                      <span className="block text-xs text-muted-foreground">A partir de</span>
                    )}
                    <span className="font-display text-lg font-bold text-foreground">
                      R$ {formatPrice(product.price)}
                    </span>
                  </div>
                  <Link to={`/produtos/${product.category}/${product.id}`}>
                    <Button size="sm" variant="accent">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
