
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Scissors, Menu, X, Calendar, Instagram } from 'lucide-react';

interface HeaderProps {
  onBookingClick: () => void;
  onAdminClick: () => void;
}

const Header = ({ onBookingClick, onAdminClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gold-gradient">José El Barbero</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('inicio')} className="hover:text-primary transition-colors">
              Inicio
            </button>
            <button onClick={() => scrollToSection('servicios')} className="hover:text-primary transition-colors">
              Servicios
            </button>
            <button onClick={() => scrollToSection('galeria')} className="hover:text-primary transition-colors">
              Galería
            </button>
            <button onClick={() => scrollToSection('contacto')} className="hover:text-primary transition-colors">
              Contacto
            </button>
            <a 
              href="https://www.instagram.com/jose_elbarbero_/?hl=es" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <Button onClick={onBookingClick} className="btn-primary">
              Reservar Cita
            </Button>
            <Button onClick={onAdminClick} variant="outline" size="sm">
              Admin
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('inicio')} className="text-left hover:text-primary transition-colors">
                Inicio
              </button>
              <button onClick={() => scrollToSection('servicios')} className="text-left hover:text-primary transition-colors">
                Servicios
              </button>
              <button onClick={() => scrollToSection('galeria')} className="text-left hover:text-primary transition-colors">
                Galería
              </button>
              <button onClick={() => scrollToSection('contacto')} className="text-left hover:text-primary transition-colors">
                Contacto
              </button>
              <a 
                href="https://www.instagram.com/jose_elbarbero_/?hl=es" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
              <Button onClick={onBookingClick} className="btn-primary w-full">
                Reservar Cita
              </Button>
              <Button onClick={onAdminClick} variant="outline" size="sm" className="w-full">
                Panel Admin
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
