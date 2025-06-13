
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors, Brush, Sparkles, Clock } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Scissors className="h-8 w-8 text-primary" />,
      title: "Corte Clásico",
      description: "Cortes tradicionales con técnicas modernas para un look elegante y atemporal.",
      price: "€25",
      duration: "45 min"
    },
    {
      icon: <Brush className="h-8 w-8 text-primary" />,
      title: "Barba & Bigote",
      description: "Arreglo completo de barba con diseño personalizado y productos premium.",
      price: "€20",
      duration: "30 min"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Corte + Barba",
      description: "Servicio completo que incluye corte de cabello y arreglo de barba.",
      price: "€40",
      duration: "60 min"
    },
    {
      icon: <Scissors className="h-8 w-8 text-primary" />,
      title: "Fade Moderno",
      description: "Cortes fade degradados con acabados precisos y estilo contemporáneo.",
      price: "€30",
      duration: "50 min"
    },
    {
      icon: <Brush className="h-8 w-8 text-primary" />,
      title: "Afeitado Clásico",
      description: "Afeitado tradicional con navaja, toallas calientes y productos naturales.",
      price: "€25",
      duration: "40 min"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Tratamiento Capilar",
      description: "Tratamientos especializados para el cuidado y fortalecimiento del cabello.",
      price: "€35",
      duration: "45 min"
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros <span className="gold-gradient">Servicios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra gama completa de servicios de barbería moderna, 
            donde la tradición se encuentra con la innovación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                  {service.icon}
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary">{service.price}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.duration}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-primary">Horarios de Atención</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold">Lunes - Viernes</div>
                <div className="text-muted-foreground">9:00 AM - 8:00 PM</div>
              </div>
              <div>
                <div className="font-semibold">Sábados</div>
                <div className="text-muted-foreground">9:00 AM - 6:00 PM</div>
              </div>
              <div>
                <div className="font-semibold">Domingos</div>
                <div className="text-muted-foreground">10:00 AM - 4:00 PM</div>
              </div>
              <div>
                <div className="font-semibold">Festivos</div>
                <div className="text-muted-foreground">Consultar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
