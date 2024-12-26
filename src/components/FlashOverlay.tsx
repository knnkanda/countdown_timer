import React from 'react';

export const FlashOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white animate-flash pointer-events-none" />
  );
};