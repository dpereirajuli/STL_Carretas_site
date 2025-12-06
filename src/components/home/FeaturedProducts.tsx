import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import carretaPrancha from "@/assets/carreta_prancha.jpeg";
import carretaPrancha2Eixos from "@/assets/carreta_prancha_2eixos.jpeg";
import plataforma from "@/assets/Plataforma.jpeg";
import carretinha from "@/assets/carretinha.jpeg";

const products = [
  {
    id: 7,
    name: "Carretinha prancha",
    category: "carretinha",
    price: 3900,
    image: carretaPrancha,
    rating: 5,
    reviews: 0,
  },
  {
    id: 8,
    name: "Reboque 2 eixos",
    category: "carretinha",
    price: 6500,
    image: carretaPrancha2Eixos,
    rating: 5,
    reviews: 0,
  },
  {
    id: 9,
    name: "Plataforma guincho",
    category: "carretinha",
    price: 15000,
    image: plataforma,
    rating: 5,
    reviews: 0,
  },
  {
    id: 10,
    name: "ASA DELTA PARA 1 CARRO E 1 MOTO",
    category: "carretinha",
    price: 4500,
    image: carretinha,
    rating: 5,
    reviews: 0,
  },
];

export function FeaturedProducts() {
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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 bg-muted"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                    {product.badge}
                  </span>
                )}
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
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through mr-2">
                        R$ {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="font-display text-lg font-bold text-foreground">
                      R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
