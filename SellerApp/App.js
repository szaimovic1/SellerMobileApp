import React from 'react';
import Navigator from './routes/drawer';
import { ProductsContextProvider } from './contexts/productsContext';

export default function App() {
  return (
    <ProductsContextProvider>
      <Navigator />
    </ProductsContextProvider>
  );
}
