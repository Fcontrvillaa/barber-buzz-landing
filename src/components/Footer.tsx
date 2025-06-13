
import React from 'react';
import { Scissors, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold gold-gradient">José El Barbero</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Barbería moderna y contemporánea con más de 10 años de experiencia 
              creando looks únicos para el hombre de hoy.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Servicios</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Corte Clásico</li>
              <li>Fade Moderno</li>
              <li>Barba & Bigote</li>
              <li>Afeitado Clásico</li>
              <li>Tratamiento Capilar</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+34 123 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>jose@elbarbero.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Calle Principal 123, Madrid</span>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Horarios</h3>
            <ul className="space-y-2 text-sm text-muted-foreground mb-4">
              <li>Lun - Vie: 9:00 - 20:00</li>
              <li>Sábado: 9:00 - 18:00</li>
              <li>Domingo: 10:00 - 16:00</li>
            </ul>
            
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.instagram.com/jose_elbarbero_/?hl=es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-border my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 José El Barbero. Todos los derechos reservados.</p>
          <p>Diseñado con tecnología moderna para la barbería del futuro.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
