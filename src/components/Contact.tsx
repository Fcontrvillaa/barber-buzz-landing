
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Instagram, Mail, ExternalLink } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contacto" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Visítanos en <span className="gold-gradient">Nuestra Barbería</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Te esperamos en nuestro local moderno y contemporáneo. 
            No dudes en contactarnos para cualquier consulta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary">
                  <MapPin className="h-5 w-5" />
                  <span>Ubicación</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Calle Principal 123, Centro<br />
                  28001 Madrid, España
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver en Google Maps
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary">
                  <Phone className="h-5 w-5" />
                  <span>Contacto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+34 123 456 789</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>jose@elbarbero.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href="https://www.instagram.com/jose_elbarbero_/?hl=es" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    @jose_elbarbero_
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary">
                  <Clock className="h-5 w-5" />
                  <span>Horarios</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span className="text-muted-foreground">9:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados</span>
                    <span className="text-muted-foreground">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos</span>
                    <span className="text-muted-foreground">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Festivos</span>
                    <span className="text-muted-foreground">Consultar</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="space-y-6">
            <Card className="glass-card h-96">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full bg-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Mapa interactivo aquí<br />
                      <span className="text-sm">Integración con Google Maps</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GitHub Pages Instructions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-primary">Instrucciones de Despliegue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Para desplegar en GitHub Pages:</h4>
                  <ol className="text-sm space-y-1 text-muted-foreground">
                    <li>1. Haz fork del repositorio</li>
                    <li>2. Ve a Settings → Pages</li>
                    <li>3. Selecciona "Deploy from a branch"</li>
                    <li>4. Elige "main" como branch</li>
                    <li>5. Ejecuta <code className="bg-background px-2 py-1 rounded">npm run build</code></li>
                    <li>6. Tu sitio estará en: username.github.io/repo-name</li>
                  </ol>
                </div>
                
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Comandos necesarios:</h4>
                  <div className="text-sm space-y-1 font-mono text-muted-foreground">
                    <div><code>git clone [tu-repo]</code></div>
                    <div><code>npm install</code></div>
                    <div><code>npm run dev</code> (desarrollo)</div>
                    <div><code>npm run build</code> (producción)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
