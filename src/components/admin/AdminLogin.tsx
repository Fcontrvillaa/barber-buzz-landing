
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  password: string;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
}

const AdminLogin = ({ isOpen, onClose, password, onPasswordChange, onLogin }: AdminLoginProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gold-gradient text-center">
            Panel de Administración
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="password" className="text-base font-semibold">
              Contraseña de Administrador
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Ingresa la contraseña"
              onKeyPress={(e) => e.key === 'Enter' && onLogin()}
            />
          </div>
          
          <Button onClick={onLogin} className="w-full btn-primary">
            Acceder
          </Button>
          
          <p className="text-sm text-muted-foreground text-center">
            Contraseña de prueba: admin123
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
