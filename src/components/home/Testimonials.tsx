import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Eduardo",
    role: "Empresário - Transportadora Silva",
    content: "Compramos 5 carretinhas guincho e a qualidade é excepcional. O atendimento foi impecável do início ao fim. Recomendo!",
    rating: 5,
    avatar: "CE",
  },
  {
    id: 2,
    name: "Marina Santos",
    role: "Agricultora",
    content: "A carretinha de carga facilitou muito nosso trabalho na fazenda. Resistente e prática, valeu cada centavo investido.",
    rating: 5,
    avatar: "MS",
  },
  {
    id: 3,
    name: "Roberto Almeida",
    role: "Mecânico",
    content: "O configurador online é sensacional! Montei a carretinha exatamente como eu precisava. Entrega rápida e produto perfeito.",
    rating: 5,
    avatar: "RA",
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Depoimentos
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-primary-foreground/70">
            A satisfação dos nossos clientes é nossa maior conquista. 
            Veja o que eles têm a dizer sobre nossas carretinhas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-primary-foreground/5 backdrop-blur rounded-xl p-6 border border-primary-foreground/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-accent/20" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="font-display font-bold text-accent-foreground">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
