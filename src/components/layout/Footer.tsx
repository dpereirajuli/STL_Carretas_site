import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";


const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/stlcarretas/" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img 
                src={logo} 
                alt="STL Carretas" 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Líder em soluções de transporte e reboque. Qualidade, inovação e segurança 
              em cada carretinha que produzimos há mais de 20 anos.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="text-primary-foreground/70">(11) 96083-3431</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5" />
                <p className="text-primary-foreground/70">Stl.carretasreboque@hotmail.com</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <p className="text-primary-foreground/70">
                  Av. Almeida Cunha, 394 C<br />
                  Marengo - Itaquaquecetuba/SP<br />
                  CEP: 08594-130
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="text-primary-foreground/50 text-sm text-center">
            © 2024 STL Carretas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
