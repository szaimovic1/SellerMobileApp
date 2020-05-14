import React, { useEffect, useState } from 'react';
import {createNav} from './routes/drawer';
import { ProductsContextProvider } from './contexts/productsContext';
import { OrdersContextProvider } from './contexts/ordersContext';
import { TablesContextProvider } from './contexts/tablesContext';
import { NotificationsContextProvider } from './contexts/notificationsContext';
import { guestLogIn, getGuestToken, clearAsyncStorage } from './functions/storage';
//clearAsyncStorage();
export default function App() {
  
  const [data, setData] = useState({}); //podaci o poslovnici
  const getInfo = async(TOKEN) => { //dobavljanje podataka sa servera
    fetch("https://cash-register-server-si.herokuapp.com/api/seller-app/data", { 
      method: "GET",
      headers: {
          'Authorization': 'Bearer ' + TOKEN
      }
  })
  .then((response) => response.json())
  .then((dataServer) => {
    setData(dataServer);
  }).done();
  }
  useEffect(() => {
    guestLogIn(); //prvo je potrebno prijaviti guesta
    async function getTokenAndInfo() { /* definisanje async funkcije u kojoj dobavlja guestToken 
      i poziva funkciju koja dobavlja podatke sa servera */
      let TOKEN = await getGuestToken();
      if(typeof TOKEN !== 'string') {
        guestLogIn();
        TOKEN = await getGuestToken();
    }
    getInfo(TOKEN); //pozivamo funkciju koja ce dobaviti potrebne podatke
  }
  getTokenAndInfo(); // na ovaj nacin poziva se async funkcija unutar useEffect
  }, []);
  const Navigator = createNav(data);
  return (    
    <ProductsContextProvider>
      <OrdersContextProvider>
        <TablesContextProvider>
          <NotificationsContextProvider>
            <Navigator />
          </NotificationsContextProvider>
        </TablesContextProvider>
      </OrdersContextProvider>
    </ProductsContextProvider>
    
  );
}