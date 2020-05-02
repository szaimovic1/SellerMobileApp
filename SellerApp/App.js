import React from 'react';
import Navigator from './routes/drawer';
import { ProductsContextProvider } from './contexts/productsContext';
import { OrdersContextProvider } from './contexts/ordersContext';
import { TablesContextProvider } from './contexts/tablesContext';

export default function App() {
  return (    
    <ProductsContextProvider>
      <OrdersContextProvider>
        <TablesContextProvider>
        <Navigator />
        </TablesContextProvider>
      </OrdersContextProvider>
    </ProductsContextProvider>
    
  );
}
