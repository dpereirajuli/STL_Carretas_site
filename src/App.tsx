import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import SobreNos from "./pages/SobreNos";
import Produtos from "./pages/Produtos";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";
import Configurador from "./pages/Configurador";
import Contato from "./pages/Contato";
import Carrinho from "./pages/Carrinho";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<SobreNos />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produtos/:category" element={<Produtos />} />
            <Route path="/produtos/:category/:id" element={<ProdutoDetalhe />} />
            <Route path="/produto/:id" element={<ProdutoDetalhe />} />
            <Route path="/configurador" element={<Configurador />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
