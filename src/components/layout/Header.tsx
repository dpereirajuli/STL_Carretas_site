import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { useCart } from "@/contexts/CartContext";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Sobre Nós", href: "/sobre" },
  {
    name: "Produtos",
    href: "/produtos",
    children: [
      { name: "Carretinhas", href: "/produtos/carretinha" },
      { name: "Acessórios", href: "/produtos/acessorios" },
    ],
  },
  { name: "Contato", href: "/contato" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { getItemCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container-custom flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="STL Carretas Reboques" 
            className="h-14 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className={cn(
                  "nav-link flex items-center gap-1 py-2",
                  location.pathname === item.href && "text-accent"
                )}
              >
                {item.name}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </Link>

              {item.children && activeDropdown === item.name && (
                <div className="absolute top-full left-0 pt-2 animate-fade-in">
                  <div className="bg-card rounded-lg shadow-medium border border-border py-2 min-w-[220px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-accent hover:bg-muted transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/carrinho"
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
              {getItemCount()}
            </span>
          </Link>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <div className="container-custom py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className="block py-3 px-4 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                  onClick={() => !item.children && setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block py-2 px-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
