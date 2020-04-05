import {AsyncStorage, Alert} from 'react-native';

export const checkIfAlreadyLoggedIn = async (navigation) => {
  const TOKEN = await AsyncStorage.getItem('token');
  if (TOKEN != undefined) navigation.navigate('DisplayProducts');
}

export const checkIfOrdersEmpty = async () => {
  const orders = await AsyncStorage.getItem('orders');
  if (orders.length === 0) {
    createOrders();
  }
}

export const createOrders = async () => {
    try {
        const orders = [];
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
        console.log("Error saving orders");
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
          Alert.alert ('Success', 'New order saved successfully!',[{
              text: 'Okay'
          }]);
        } )
        .catch( ()=>{
            Alert.alert ('Error', 'Error saving new order!',[{
              text: 'Okay'
            }]);
        } )
    } catch (error) {
      Alert.alert ('Error', 'Error saving new order!',[{
        text: 'Okay'
      }]);
    }    
}        