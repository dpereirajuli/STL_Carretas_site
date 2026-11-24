import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { formatPrice } from "@/services/products";

export function Categories() {
  const { data = [] } = useProducts();
  const promotions = data.filter((p) => p.promotion && p.category !== "opcional");

  if (promotions.length === 0) return null;

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Ofertas Especiais
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Promoções
          </h2>
          <p className="text-muted-foreground">
            Confira nossas promoções especiais em carretinhas de alta qualidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {promotions.map((product, index) => (
            <Link
              key={product.id}
              to={`/produtos/${product.category}/${product.id}`}
              className="group card-product bg-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 bg-muted"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {product.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {product.highlights.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mb-4">
                  {product.priceVariations.length > 0 && (
                    <span className="block text-xs text-muted-foreground">A partir de</span>
                  )}
                  <span className="font-display text-2xl font-bold text-accent">
                    R$ {formatPrice(product.price)}
                  </span>
                </div>
                <span className="inline-flex items-center text-accent font-semibold group-hover:gap-3 gap-2 transition-all">
                  Ver Produto
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
