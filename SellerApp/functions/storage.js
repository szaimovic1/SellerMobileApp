import {AsyncStorage} from 'react-native';

export const createOrders = async () => {
    try {
        const orders = [];
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
        console.log("Error saving orders");
    }
}

export const checkIfAlreadyLoggedIn = async (navigation) => {
  const TOKEN = await AsyncStorage.getItem('token');
  if (TOKEN != undefined) navigation.navigate('DisplayProducts');
}

export const checkIfOrdersEmpty = async () => {
  const orders = await AsyncStorage.getItem('orders');

  //console.log(JSON.parse(orders));

  if (typeof orders === 'undefined') {
    createOrders();
  }
}

export const saveNewOrder = async (newOrder) => {
    // spašavaju se podaci iz newOrder u AsyncStorage
    try {
      // uzmemo postojeće orders iz AsyncStorage
      const existingOrders = await AsyncStorage.getItem('orders');
      // u slučaju da ih nema
      let ordersRec = JSON.parse(existingOrders);
      if( !ordersRec ){
        ordersRec = []; // kreiramo novi niz
      }
      // ubacimo novu narudžbu u niz narudžbi
      ordersRec.push(newOrder);
      // spasimo novi niz narudžbi
      await AsyncStorage.setItem('orders', JSON.stringify(ordersRec) )
        .then( ()=>{
          console.log('New order saved succesfully');
          //console.log(ordersRec);
        } )
        .catch( ()=>{
        console.log('Error saving new order');
        } )
    } catch (error) {
      console.log("Error saving new order");
    }    
}        