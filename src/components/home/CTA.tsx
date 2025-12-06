import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="relative bg-gradient-to-br from-accent to-orange-dark rounded-3xl overflow-hidden">
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground mb-4">
              Pronto para Encontrar sua Carretinha Ideal?
            </h2>
            <p className="text-accent-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Monte sua carretinha personalizada ou fale com nossos especialistas 
              para encontrar a solução perfeita para você.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                <Link to="/configurador">
                  Configurar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 text-lg px-8 py-6">
                <a href="tel:+5511999999999">
                  <Phone className="mr-2 w-5 h-5" />
                  Ligar Agora
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
