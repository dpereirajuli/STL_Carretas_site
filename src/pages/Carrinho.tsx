import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Carrinho = () => {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const [observations, setObservations] = useState("");

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const generateWhatsAppMessage = () => {
    let message = "Olá! Gostaria de solicitar um orçamento para os seguintes itens:\n\n";
    
    items.forEach((item, index) => {
      const itemPrice = item.priceVariation?.price || item.price;
      const accessoriesTotal = item.selectedAccessories?.reduce(
        (sum, acc) => sum + acc.price,
        0
      ) || 0;
      const itemTotal = (itemPrice + accessoriesTotal) * item.quantity;

      message += `${index + 1}. ${item.name}\n`;
      message += `   Quantidade: ${item.quantity}\n`;
      
      if (item.priceVariation) {
        message += `   Opção: ${item.priceVariation.name}\n`;
        message += `   Preço unitário: R$ ${formatPrice(itemPrice)}\n`;
      } else {
        message += `   Preço unitário: R$ ${formatPrice(item.price)}\n`;
      }

      if (item.selectedAccessories && item.selectedAccessories.length > 0) {
        message += `   Acessórios:\n`;
        item.selectedAccessories.forEach((acc) => {
          message += `     - ${acc.name}: R$ ${formatPrice(acc.price)}\n`;
        });
        message += `   Total acessórios: R$ ${formatPrice(accessoriesTotal)}\n`;
      }

      message += `   Subtotal: R$ ${formatPrice(itemTotal)}\n\n`;
    });

    message += `\n*Total Geral: R$ ${formatPrice(getTotal())}*\n\n`;
    
    if (observations.trim()) {
      message += `*Observações:*\n${observations.trim()}\n\n`;
    }
    
    message += "Aguardo retorno para finalizar o pedido. Obrigado!";

    return encodeURIComponent(message);
  };

  const handleFinalizePurchase = () => {
    const phoneNumber = "5511960833431"; // WhatsApp: 11 96083-3431
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0) {
    return (
      <Layout>
        <section className="section-padding bg-background min-h-screen pt-32">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center py-16">
              <ShoppingCart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Seu carrinho está vazio
              </h1>
              <p className="text-muted-foreground mb-8">
                Adicione produtos ao carrinho para continuar comprando.
              </p>
              <Link to="/produtos">
                <Button className="btn-accent">
                  Ver Produtos
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-background min-h-screen pt-32">
        <div className="container-custom">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Carrinho de Compras
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => {
                const itemPrice = item.priceVariation?.price || item.price;
                const accessoriesTotal = item.selectedAccessories?.reduce(
                  (sum, acc) => sum + acc.price,
                  0
                ) || 0;
                const itemTotal = (itemPrice + accessoriesTotal) * item.quantity;

                return (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Image */}
                      <div className="w-full sm:w-32 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-lg text-foreground mb-2">
                          {item.name}
                        </h3>
                        
                        {item.priceVariation && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.priceVariation.name}
                          </p>
                        )}

                        {/* Preço do produto */}
                        <div className="mb-2">
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Produto:</span> R$ {formatPrice(itemPrice)}
                            {item.quantity > 1 && ` × ${item.quantity}`}
                          </p>
                        </div>

                        {item.selectedAccessories && item.selectedAccessories.length > 0 && (
                          <div className="mb-2">
                            <p className="text-sm font-medium text-foreground mb-1">
                              Acessórios:
                            </p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {item.selectedAccessories.map((acc) => (
                                <li key={acc.id}>
                                  • {acc.name} - R$ {formatPrice(acc.price)}
                                  {item.quantity > 1 && ` × ${item.quantity}`}
                                </li>
                              ))}
                            </ul>
                            {item.quantity > 1 && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Total acessórios: R$ {formatPrice(accessoriesTotal * item.quantity)}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-muted transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-muted transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-display font-bold text-lg text-foreground">
                              R$ {formatPrice(itemTotal)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Total
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive/80 transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-32">
                <h2 className="font-display font-bold text-xl text-foreground mb-6">
                  Resumo do Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} itens)</span>
                    <span>R$ {formatPrice(getTotal())}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-xl text-foreground">Total</span>
                    <span className="font-display font-bold text-2xl text-accent">
                      R$ {formatPrice(getTotal())}
                    </span>
                  </div>
                </div>

                {/* Observações */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Observações (opcional)
                  </label>
                  <Textarea
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    placeholder="Adicione observações sobre seu pedido..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleFinalizePurchase}
                  className="w-full btn-accent text-lg py-6 mb-4"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Finalizar via WhatsApp
                </Button>

                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full"
                >
                  Limpar Carrinho
                </Button>

                <Link to="/produtos" className="block mt-4 text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Carrinho;

