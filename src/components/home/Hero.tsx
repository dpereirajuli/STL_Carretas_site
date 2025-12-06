import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/SaveClip.App_AQPzJ96DFqQmG54AhC9dapbSKVDPw7rkfjvjivzf7Pj8Bo4hopD0YfVlc4ifnNlWz1dbBTzr7JXLTIPfrRKgbyjSaIyUsoEB-5SP7e0.mp4";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container-custom px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Carretinhas e Reboques de{" "}
                <span className="text-accent">Alta Qualidade</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Fabricação e comercialização de carretinhas, reboques e acessórios 
                com excelência e compromisso. Soluções sob medida para suas necessidades.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="btn-accent text-lg px-8 py-6">
                <Link to="/produtos">
                  Ver Produtos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-6 border-2">
                <a href="https://wa.me/5511960833431" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 w-5 h-5" />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div>
                <p className="text-2xl font-display font-bold text-accent">STL</p>
                <p className="text-sm text-muted-foreground">Carretas</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-sm font-semibold text-foreground">Qualidade</p>
                <p className="text-sm text-muted-foreground">Garantida</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-sm font-semibold text-foreground">Sob Medida</p>
                <p className="text-sm text-muted-foreground">Personalizado</p>
              </div>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg bg-muted aspect-video">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={heroVideo} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
