import './index.css';
import React from 'react';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/common/Toast/Toast';
import Routing from './components/routes/Routing';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Routing/>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
