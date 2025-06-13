
import React from 'react';
import { Button } from '@/components/ui/button';

interface AdminPanelFooterProps {
  onLogout: () => void;
  onClose: () => void;
}

const AdminPanelFooter = ({ onLogout, onClose }: AdminPanelFooterProps) => {
  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t">
      <Button variant="outline" onClick={onLogout}>
        Cerrar Sesión
      </Button>
      <Button variant="outline" onClick={onClose}>
        Cerrar Panel
      </Button>
    </div>
  );
};

export default AdminPanelFooter;
