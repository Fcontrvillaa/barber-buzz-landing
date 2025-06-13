
import React from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

const AdminPanelHeader = () => {
  return (
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold gold-gradient">
        Panel de Administración - José El Barbero
      </DialogTitle>
    </DialogHeader>
  );
};

export default AdminPanelHeader;
