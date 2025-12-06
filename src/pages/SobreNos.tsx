import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Heart, Users, Award, Shield } from "lucide-react";
import logo from "@/assets/logo.png";

const values = [
  {
    icon: Shield,
    title: "Segurança",
    description: "Priorizamos a segurança em cada detalhe de nossos produtos.",
  },
  {
    icon: Award,
    title: "Qualidade",
    description: "Materiais premium e processos rigorosos de controle.",
  },
  {
    icon: Heart,
    title: "Compromisso",
    description: "Comprometidos com a satisfação total de nossos clientes.",
  },
  {
    icon: Users,
    title: "Equipe",
    description: "Profissionais qualificados e apaixonados pelo que fazem.",
  },
];

const SobreNos = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container-custom px-4">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Sobre Nós
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-6">
              Quem Somos
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Conheça a STL Carretas, especializada em soluções de transporte 
              e reboque com qualidade e confiança.
            </p>
          </div>
        </div>
      </section>

      {/* Quem Somos */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Quem Somos
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                STL Carretas
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A STL Carretas é uma empresa especializada na fabricação e comercialização 
                  de carretinhas e reboques de alta qualidade, localizada em Itaquaquecetuba-SP.
                </p>
                <p>
                  Com anos de experiência no mercado, oferecemos soluções personalizadas 
                  para transporte de veículos, cargas e equipamentos, sempre priorizando 
                  a segurança, durabilidade e satisfação dos nossos clientes.
                </p>
                <p>
                  Nossa equipe é formada por profissionais qualificados e comprometidos 
                  em entregar produtos que atendam às mais diversas necessidades, desde 
                  carretinhas básicas até plataformas com freio e guincho elétrico.
                </p>
                <p>
                  Trabalhamos com materiais de primeira linha e seguimos rigorosos padrões 
                  de qualidade, garantindo que cada produto seja fabricado com excelência 
                  e atenção aos detalhes.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-muted rounded-2xl p-8 flex items-center justify-center">
                <img
                  src={logo}
                  alt="STL Carretas"
                  className="w-full h-auto max-w-xs object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Nossa Missão
              </h3>
              <p className="text-muted-foreground">
                Oferecer soluções de transporte e reboque com excelência, segurança 
                e inovação, superando as expectativas de nossos clientes e contribuindo 
                para o desenvolvimento da logística nacional.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Nossa Visão
              </h3>
              <p className="text-muted-foreground">
                Ser reconhecida como a principal referência em carretinhas da América Latina, 
                expandindo nossa presença internacional e mantendo o compromisso inabalável 
                com qualidade e satisfação do cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Nossos Valores
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              O que Nos Move
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificações */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Certificações
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Qualidade Certificada
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {["ISO 9001", "INMETRO", "CONTRAN", "DENATRAN"].map((cert) => (
              <div
                key={cert}
                className="w-32 h-32 bg-muted rounded-xl flex items-center justify-center border border-border"
              >
                <span className="font-display font-bold text-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SobreNos;
