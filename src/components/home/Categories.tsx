import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import plataforma from "@/assets/Plataforma.jpeg";
import carretinha from "@/assets/carretinha.jpeg";

const categories = [
  {
    id: 10,
    title: "ASA DELTA PARA 1 CARRO E 1 MOTO",
    description: "Asa delta para 1 carro e 1 moto, com opções de guincho manual ou elétrico, com ou sem emplacamento.",
    image: carretinha,
    href: "/produtos/carretinha/10",
    features: ["Para 1 carro e 1 moto", "Guincho manual/elétrico", "Com ou sem emplacamento", "A partir de R$ 4.500"],
    price: 4500,
  },
  {
    id: 9,
    title: "Plataforma guincho",
    description: "Plataforma guincho com medidas 4,00 x 2,00 e capacidade de carga de 2.500 kg. Fazemos também sob medida e para capacidade de até 3.500 kg.",
    image: plataforma,
    href: "/produtos/carretinha/9",
    features: ["4.00 x 2.00", "Capacidade: 2.500 kg", "Fazemos sob medida", "Até 3.500 kg"],
    price: 15000,
  },
];

export function Categories() {
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
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={category.href}
              className="group card-product bg-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 bg-muted"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {category.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {category.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mb-4">
                  <span className="font-display text-2xl font-bold text-accent">
                    R$ {category.price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
