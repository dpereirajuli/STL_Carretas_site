import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Check, ChevronRight, RotateCcw, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import carretaPrancha from "@/assets/carreta_prancha.jpeg";
import plataforma from "@/assets/Plataforma.jpeg";
import carretinha from "@/assets/carretinha.jpeg";

const steps = ["Modelo Base", "Configuração", "Acessórios", "Resumo"];

const models = [
  { id: "guincho", name: "Plataforma guincho", price: 15000, image: plataforma, desc: "Transporte de veículos" },
  { id: "carga", name: "Carretinha prancha", price: 3900, image: carretaPrancha, desc: "Transporte de materiais" },
  { id: "multiuso", name: "ASA DELTA PARA 1 CARRO E 1 MOTO", price: 4500, image: carretinha, desc: "Uso versátil" },
];

const configurations = {
  tamanho: [
    { id: "p", name: "Pequena (2,5m)", price: 0 },
    { id: "m", name: "Média (3,5m)", price: 800 },
    { id: "g", name: "Grande (4,5m)", price: 1500 },
  ],
  capacidade: [
    { id: "1000", name: "1.000 kg", price: 0 },
    { id: "1500", name: "1.500 kg", price: 500 },
    { id: "2000", name: "2.000 kg", price: 1000 },
  ],
  cor: [
    { id: "preto", name: "Preto", hex: "#1a1a1a", price: 0 },
    { id: "cinza", name: "Cinza", hex: "#6b7280", price: 0 },
    { id: "laranja", name: "Laranja", hex: "#f97316", price: 300 },
    { id: "azul", name: "Azul", hex: "#3b82f6", price: 300 },
  ],
};

const accessories = [
  { id: "freio", name: "Sistema de Freio Inercial", price: 890 },
  { id: "rampa", name: "Rampa Articulada", price: 690 },
  { id: "cadeado", name: "Cadeado de Engate Reforçado", price: 189 },
  { id: "cinta", name: "Kit Cintas de Amarração (4x)", price: 149 },
  { id: "estepe", name: "Estepe Completo", price: 399 },
  { id: "led", name: "Iluminação LED Premium", price: 249 },
  { id: "suporte", name: "Suporte de Pé Reforçado", price: 249 },
  { id: "toldo", name: "Toldo de Proteção", price: 590 },
];

const Configurador = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [config, setConfig] = useState({
    tamanho: "m",
    capacidade: "1500",
    cor: "preto",
  });
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

  const model = models.find(m => m.id === selectedModel);
  
  const configPrice = 
    (configurations.tamanho.find(t => t.id === config.tamanho)?.price || 0) +
    (configurations.capacidade.find(c => c.id === config.capacidade)?.price || 0) +
    (configurations.cor.find(c => c.id === config.cor)?.price || 0);

  const accessoriesPrice = selectedAccessories.reduce((sum, accId) => {
    return sum + (accessories.find(a => a.id === accId)?.price || 0);
  }, 0);

  const totalPrice = (model?.price || 0) + configPrice + accessoriesPrice;

  const canProceed = () => {
    if (currentStep === 0) return selectedModel !== null;
    return true;
  };

  const reset = () => {
    setCurrentStep(0);
    setSelectedModel(null);
    setConfig({ tamanho: "m", capacidade: "1500", cor: "preto" });
    setSelectedAccessories([]);
  };

  const toggleAccessory = (id: string) => {
    setSelectedAccessories(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container-custom px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Monte sua Carretinha
          </h1>
          <p className="text-primary-foreground/80">
            Personalize sua carretinha ideal em 4 passos simples.
          </p>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-card border-b border-border sticky top-16 md:top-20 z-40">
        <div className="container-custom px-4 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                    i < currentStep ? "bg-accent text-accent-foreground" :
                    i === currentStep ? "bg-accent text-accent-foreground" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={cn(
                    "hidden sm:block text-sm font-medium",
                    i <= currentStep ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Model */}
              {currentStep === 0 && (
                <div className="animate-fade-in">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Escolha o Modelo Base
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {models.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedModel(m.id)}
                        className={cn(
                          "text-left rounded-xl overflow-hidden border-2 transition-all",
                          selectedModel === m.id 
                            ? "border-accent shadow-accent" 
                            : "border-border hover:border-accent/50"
                        )}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-display font-bold text-foreground">{m.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{m.desc}</p>
                          <p className="text-accent font-bold">A partir de R$ {m.price.toLocaleString()}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Configuration */}
              {currentStep === 1 && (
                <div className="animate-fade-in space-y-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Configure sua Carretinha
                  </h2>

                  {/* Tamanho */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Tamanho</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {configurations.tamanho.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setConfig(c => ({ ...c, tamanho: t.id }))}
                          className={cn(
                            "p-4 rounded-lg border-2 text-center transition-all",
                            config.tamanho === t.id 
                              ? "border-accent bg-accent/5" 
                              : "border-border hover:border-accent/50"
                          )}
                        >
                          <p className="font-medium text-foreground">{t.name}</p>
                          <p className="text-sm text-accent">
                            {t.price > 0 ? `+R$ ${t.price}` : "Incluído"}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Capacidade */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Capacidade de Carga</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {configurations.capacidade.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setConfig(cfg => ({ ...cfg, capacidade: c.id }))}
                          className={cn(
                            "p-4 rounded-lg border-2 text-center transition-all",
                            config.capacidade === c.id 
                              ? "border-accent bg-accent/5" 
                              : "border-border hover:border-accent/50"
                          )}
                        >
                          <p className="font-medium text-foreground">{c.name}</p>
                          <p className="text-sm text-accent">
                            {c.price > 0 ? `+R$ ${c.price}` : "Incluído"}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cor */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Cor</h3>
                    <div className="flex gap-4">
                      {configurations.cor.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setConfig(cfg => ({ ...cfg, cor: c.id }))}
                          className={cn(
                            "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                            config.cor === c.id 
                              ? "border-accent" 
                              : "border-transparent"
                          )}
                        >
                          <div 
                            className="w-12 h-12 rounded-full border-2 border-border"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="text-sm text-foreground">{c.name}</span>
                          {c.price > 0 && (
                            <span className="text-xs text-accent">+R$ {c.price}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Accessories */}
              {currentStep === 2 && (
                <div className="animate-fade-in">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Adicione Acessórios
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {accessories.map((acc) => (
                      <button
                        key={acc.id}
                        onClick={() => toggleAccessory(acc.id)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all",
                          selectedAccessories.includes(acc.id)
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center",
                            selectedAccessories.includes(acc.id)
                              ? "bg-accent border-accent"
                              : "border-muted-foreground"
                          )}>
                            {selectedAccessories.includes(acc.id) && (
                              <Check className="w-3 h-3 text-accent-foreground" />
                            )}
                          </div>
                          <span className="font-medium text-foreground">{acc.name}</span>
                        </div>
                        <span className="text-accent font-semibold">+R$ {acc.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Summary */}
              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Resumo da Configuração
                  </h2>
                  <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Modelo Base</span>
                      <span className="font-medium text-foreground">{model?.name} - R$ {model?.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Tamanho</span>
                      <span className="font-medium text-foreground">
                        {configurations.tamanho.find(t => t.id === config.tamanho)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Capacidade</span>
                      <span className="font-medium text-foreground">
                        {configurations.capacidade.find(c => c.id === config.capacidade)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Cor</span>
                      <span className="font-medium text-foreground">
                        {configurations.cor.find(c => c.id === config.cor)?.name}
                      </span>
                    </div>
                    {selectedAccessories.length > 0 && (
                      <div className="py-2 border-b border-border">
                        <span className="text-muted-foreground block mb-2">Acessórios</span>
                        <ul className="space-y-1">
                          {selectedAccessories.map(id => {
                            const acc = accessories.find(a => a.id === id);
                            return (
                              <li key={id} className="flex justify-between text-sm">
                                <span className="text-foreground">{acc?.name}</span>
                                <span className="text-accent">+R$ {acc?.price}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-40 bg-card rounded-xl border border-border p-6">
                {/* Preview */}
                {model && (
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6 relative">
                    <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                    <div 
                      className="absolute inset-0 mix-blend-multiply opacity-30"
                      style={{ backgroundColor: configurations.cor.find(c => c.id === config.cor)?.hex }}
                    />
                  </div>
                )}

                {/* Price */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Total Estimado</p>
                  <p className="font-display text-3xl font-bold text-foreground">
                    R$ {totalPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ou 12x de R$ {Math.round(totalPrice / 12).toLocaleString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  {currentStep < 3 ? (
                    <Button
                      onClick={() => setCurrentStep(s => s + 1)}
                      disabled={!canProceed()}
                      className="w-full btn-accent"
                    >
                      Continuar
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button className="w-full btn-accent">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                  )}
                  
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(s => s - 1)}
                      className="w-full"
                    >
                      Voltar
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    onClick={reset}
                    className="w-full text-muted-foreground"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Recomeçar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Configurador;
