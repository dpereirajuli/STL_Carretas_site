import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import guinchoManual from "@/assets/guincho_manual.jpeg";
import guinchoEletrico from "@/assets/guincho_eletrico.jpeg";
import cinta from "@/assets/cinta.jpeg";
import corrente from "@/assets/corrente.jpeg";

const accessories = [
  {
    id: 13,
    name: "Guincho Manual",
    category: "acessorios",
    price: 300,
    image: guinchoManual,
    rating: 5,
    reviews: 0,
  },
  {
    id: 14,
    name: "Guincho Elétrico 1361 Kg 12 Volts",
    category: "acessorios",
    price: 700,
    image: guinchoEletrico,
    rating: 5,
    reviews: 0,
  },
  {
    id: 15,
    name: "Cinta catraca (o par)",
    category: "acessorios",
    price: 160,
    image: cinta,
    rating: 5,
    reviews: 0,
  },
  {
    id: 16,
    name: "Corrente com cadeado",
    category: "acessorios",
    price: 90,
    image: corrente,
    rating: 5,
    reviews: 0,
  },
];

export function FeaturedAccessories() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Acessórios
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Acessórios em Destaque
            </h2>
          </div>
          <Link
            to="/produtos/acessorios"
            className="text-accent font-semibold hover:underline"
          >
            Ver todos os acessórios →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessories.map((accessory, index) => (
            <div
              key={accessory.id}
              className="group card-product bg-card border border-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={accessory.image}
                  alt={accessory.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 bg-muted"
                />
                {accessory.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                    {accessory.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-xs text-accent font-medium uppercase">
                  {accessory.category}
                </span>
                
                <h3 className="font-display font-bold text-foreground mt-1 mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {accessory.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {accessory.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through mr-2">
                        R$ {accessory.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="font-display text-lg font-bold text-foreground">
                      R$ {accessory.price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <Link to={`/produtos/${accessory.category}/${accessory.id}`}>
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

