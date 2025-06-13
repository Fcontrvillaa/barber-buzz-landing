
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BookingSystem from '@/components/BookingSystem';
import AdminPanel from '@/components/AdminPanel';
import { BookingProvider } from '@/contexts/BookingContext';

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <BookingProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header 
          onBookingClick={() => setIsBookingOpen(true)}
          onAdminClick={() => setIsAdminOpen(true)}
        />
        
        <Hero onBookingClick={() => setIsBookingOpen(true)} />
        <Services />
        <Gallery />
        <Contact />
        <Footer />

        <BookingSystem 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
        />
        
        <AdminPanel 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />
      </div>
    </BookingProvider>
  );
};

export default Index;
