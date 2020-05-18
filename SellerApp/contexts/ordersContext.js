import React, { useState, createContext, useContext } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { useProductsContext } from '../contexts/productsContext';

export const OrdersContext = createContext();

export const OrdersContextProvider = (props) => {
    const { children } = props;

    const { products } = useProductsContext();
    const [orders, setOrders] = useState([]);
    const [guestOrders, setGuestOrders] = useState([]);

    const updateLocalOrder = async (oldOrder, newOrder) => {
        var index = orders.indexOf(oldOrder);
        if(index !== -1) {
            orders[index] = newOrder;
        }
    }

    const updateGuestOrder = async (oldOrder, newOrder) => {
        // lokalno
        var index = guestOrders.indexOf(oldOrder);
        if(index !== -1) {
            guestOrders[index] = newOrder;
        }

        // na serveru
        var receiptItems = [];
        for (var i = 0; i < newOrder.products.length; i++) {
            var item = {
                'id': newOrder.products[i].id,
                'quantity': newOrder.products[i].times
            };
            receiptItems.push(item);
        }
        const serverOrder = {
            'id': newOrder.id,
            'receiptItems': receiptItems,
            'served' : newOrder.served,
            'seen' : newOrder.seen
        }
        var TOKEN = await AsyncStorage.getItem('token');
        fetch("https://cash-register-server-si.herokuapp.com/api/orders", {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + TOKEN
            },
            body: JSON.stringify(serverOrder)
        })
        .then((response) => response.text())
        .then((res) => console.log(res))
        .catch((error) => console.error(error))
        .done();

    }

    const deleteGuestOrder = async (id) => {
        var TOKEN = await AsyncStorage.getItem('token');
        var idLong = Number(id);       
        //lokalno
        for (var i = 0; i < guestOrders.length; i++) {
            if (guestOrders[i].id === id) {
                guestOrders.splice(i, 1);
                break;
            }
        }

        //sa servera
        fetch("https://cash-register-server-si.herokuapp.com/api/orders/" + idLong + "", {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }
        })
        .then((response) => response.text())
        .then((res) => {
            console.log(res);
           /* Alert.alert('Success', 'Order deleted successfully!', [{
                text: 'Okay'
            }]);*/
        }) 
        .catch((error) => {
            console.error(error);
            Alert.alert('Error', 'Error deleting order!', [{
                text: 'Okay'
            }]);
        })
        .done();
    }

    const updateGuestOrderState = async (order) => {
        console.log(order.served);
        //lokalno
        var index = guestOrders.indexOf(order);
        if(index !== -1) {
            guestOrders[index].served = !order.served;
            console.log("EDITOVANO NA ", guestOrders[index]);
            console.log("EDITOVANO NA ", order.served);
        }        
        //na serveru

    }

    const updateGuestOrderSeen = (order) => {
        var index = guestOrders.indexOf(order);
        if(index !== -1) {
            guestOrders[index].seen = true;
        }   
    }

    /* POST zahtjev serveru za slanje GUEST narudzbe*/
    const postOrderGuest = async (navigation, narudzba, backupObject) => {
        var data = backupObject;
        console.log(data);
        var TOKEN = await AsyncStorage.getItem('token');
        fetch("https://cash-register-server-si.herokuapp.com/api/guest-orders", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TOKEN
        },
        body: JSON.stringify(data)
        })
        .then((response) => response.text())
        .then((res) => {
            const data = JSON.parse(res);
            console.log(data);
            console.log(data.message);
            if (data.message === "Order is successfully saved!") {
                deleteGuestOrder(narudzba.id);                
                Alert.alert('Submited!', 'Order was successfully submitted.', [
                {
                    text: 'OK'
                }])
                navigation.navigate('DisplayOrders');
            } else {
                Alert.alert('Error!', 'Error submiting order.', [
                {
                        text: 'OK'
                }])
            }
        }).catch((error) => console.error(error))
        .done();
    }

    const getOrders = async () => {
        let listOfOrders = JSON.parse(await AsyncStorage.getItem('orders'));
        
        if(listOfOrders == null || typeof listOfOrders === 'undefined')listOfOrders = [];
        setOrders(listOfOrders);
    }

    const getOrdersServer = async() => {
        console.log("SERVER");
        var TOKEN = await AsyncStorage.getItem('token');
        fetch("https://cash-register-server-si.herokuapp.com/api/guest-orders", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + TOKEN
          }
        })
        .then((response) => response.json())
        .then((orde) => {
            var guestOrdersArray = [];  
            //ovo je lista narudzbi sa servera
            for(var i =0;i<orde.length; i++) {
                var tableNumber = orde[i].message;
                var orderedItems = orde[i].receiptItems; // ovo su proizvodi i-te narudzbe
                var orderProducts = [];
                for(var j = 0; j< orderedItems.length; j++) {
                    var product = products.filter((item) =>{ // trazimo proizvod u listi proizvoda
                    return item.id==orderedItems[j].id;
                    });
                    if(product.length!=0) {
                        var trazeni = product[0];
                        var object= { // pravimo objekat tako da kombinujemo podatke sa servera i iz liste proizvoda
                            'id': trazeni.id,
                            'name': trazeni.name,
                            'times': orderedItems[j].quantity, //ovo je ponavljanje datog proizvoda u narudzbi
                            'price': trazeni.price,
                            'imageBase64': trazeni.imageBase64,
                        };
                        orderProducts.push(object);
                    }
                }
                var newGuestOrder = {
                    'id' : orde[i].id,
                    'products': orderProducts,
                    'tableNr': tableNumber,
                    'served': orde[i].served,
                    'seen' : orde[i].seen
                };
                guestOrdersArray.push(newGuestOrder);
                console.log(newGuestOrder.seen);
            }
          
            setGuestOrders(guestOrdersArray);
            return guestOrdersArray;
        })
        .done();
    }

    const subscribeToServerOrders = async (stompContext, StompEventTypes) => {
        const client = await stompContext.newStompClient('https://cash-register-server-si.herokuapp.com/ws');
        stompContext.addStompEventListener(StompEventTypes.Connect, async () => {
          console.log("Connected");
          if(stompContext.getStompClient() === undefined)
            await stompContext.newStompClient('https://cash-register-server-si.herokuapp.com/ws');
          setTopicId(stompContext
            .getStompClient()
            .subscribe('/topic/guest_order', (msg) => {
                getOrdersServer();
            })
        )});
    
        stompContext.addStompEventListener(StompEventTypes.Disconnect, () => {
          console.log("Disconnected");
        });
    
        stompContext.addStompEventListener(StompEventTypes.WebSocketClose, () => {
          console.log("Disconnected (not graceful)");
        });
    };

    const ordersData = {
        orders,
        setOrders,
        guestOrders,
        getOrders,
        getOrdersServer,
        updateLocalOrder,
        updateGuestOrder,
        deleteGuestOrder,
        updateGuestOrderState,
        postOrderGuest,
        updateGuestOrderSeen,
        subscribeToServerOrders,
    }

    return <OrdersContext.Provider value={ordersData}>{ children }</OrdersContext.Provider>
}

export const { Consumer } = OrdersContext;

export const useOrdersContext = () => useContext(OrdersContext);