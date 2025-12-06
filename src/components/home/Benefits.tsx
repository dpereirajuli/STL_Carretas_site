import { Shield, Award, Wrench, Truck, HeadphonesIcon, Leaf } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Segurança Máxima",
    description: "Todas nossas carretinhas passam por rigorosos testes de qualidade e segurança.",
  },
  {
    icon: Award,
    title: "Garantia Estendida",
    description: "Oferecemos garantia de até 5 anos em toda nossa linha de produtos.",
  },
  {
    icon: Wrench,
    title: "Personalização",
    description: "Configure sua carretinha do seu jeito com nosso configurador exclusivo.",
  },
  {
    icon: Truck,
    title: "Entrega Nacional",
    description: "Entregamos em todo o Brasil com seguro e rastreamento em tempo real.",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte 24/7",
    description: "Equipe especializada disponível para ajudar quando você precisar.",
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description: "Processos produtivos eco-friendly e materiais recicláveis.",
  },
];

export function Benefits() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Por que nos escolher
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Diferenciais CarretasPro
          </h2>
          <p className="text-muted-foreground">
            Há mais de 20 anos entregando qualidade, inovação e a melhor experiência 
            em carretinhas para nossos clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-medium transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
