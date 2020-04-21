import React from 'react';
import Navigator from './routes/drawer';
import { ProductsContextProvider } from './contexts/productsContext';
import { OrdersContextProvider } from './contexts/ordersContext';

export default function App() {
  return (    
    <ProductsContextProvider>
      <OrdersContextProvider>
        <Navigator />
      </OrdersContextProvider>
    </ProductsContextProvider>
    
  );
}
