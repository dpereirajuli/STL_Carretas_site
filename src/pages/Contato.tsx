import { Layout } from "@/components/layout/Layout";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefone",
    lines: ["(11) 96083-3431"],
  },
  {
    icon: Mail,
    title: "E-mail",
    lines: ["Stl.carretasreboque@hotmail.com"],
  },
  {
    icon: MapPin,
    title: "Endereço",
    lines: ["Rua Dois, 302", "Pq. Residencial Souza Campos", "Itaquaquecetuba/SP"],
  },
  {
    icon: Clock,
    title: "Horário",
    lines: ["Seg a Sex: 8h às 18h", "Sábado: 8h às 13h"],
  },
];

const Contato = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container-custom px-4">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Contato
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
            Fale Conosco
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Tire suas dúvidas, solicite um orçamento ou agende uma visita. 
            Nossa equipe está pronta para atendê-lo.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                  Informações de Contato
                </h2>
                
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      {info.lines.map((line) => (
                        <p key={line} className="text-muted-foreground text-sm">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=Rua%20Dois%2C%20302%2C%20Parque%20Residencial%20Souza%20Campos%2C%20Itaquaquecetuba%20-%20SP&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização STL Carretas"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
