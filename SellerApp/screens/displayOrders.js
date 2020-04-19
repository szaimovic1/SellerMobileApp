import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { WingBlank, WhiteSpace, Button } from '@ant-design/react-native';
import { Card } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import styles from '../styles/productStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import { useProductsContext } from '../contexts/productsContext';

export default function DisplayOrders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [guestOrders, setGuestOrders] = useState([]);
  const { products, getProducts } = useProductsContext();
  const getOrders = async () => {
    let listOfOrders = JSON.parse(await AsyncStorage.getItem('orders'));
    
    if(listOfOrders == null || typeof listOfOrders === 'undefined')listOfOrders = [];
    setOrders(listOfOrders);
  }

  useEffect(() => {
    getOrders()
    getProducts()
  }, []);

  const setText = (num) => {
    if (num != 0)
      return ("Table: " + num);
    else return "Shopping"
  }

  const setPrice = (singleOrder) => {
    var ammount = 0;
    {
      singleOrder.products.map((singleProduct) => {
        ammount += singleProduct.times * singleProduct.price
      });
    }
    return Math.round(ammount * 100) / 100;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getOrdersServer();
    }, 20000);
    return () => clearTimeout(timer);
  }, [guestOrders]);  

   const getOrdersServer = async() => {
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
          var tableNumber = orde[i].message; //kod njih pise da je message idstola --valjda je to to
          var orderedItems = orde[i].receiptItems; // ovo su proizvodi i-te narudzbe
          var orderProducts = [];
          for(var j = 0; j< orderedItems.length; j++) {
            //console.log(products.length);
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
          //ovdje moze ici i id koji ce se koristit za post
          'products': orderProducts,
          'tableNr': tableNumber,
          'served': null,
        };
        guestOrdersArray.push(newGuestOrder);
      }
      
      setGuestOrders(guestOrdersArray);
      return guestOrdersArray;
    })
      .done();
  }



  return (
    <ImageBackground source={require('../images/background2.png')}
      style={styles.container}>
      <NavigationEvents
        onDidFocus={getOrders}
      />
      <ScrollView>
        {orders.map((item) => {
          return (
            <TouchableOpacity key={Math.random()}
              onPress={() => {
                navigation.navigate('OrderContent', { data: { item }, orders: { orders } });
              }}>
              <WingBlank size="lg">
                <Card.Title
                  title={setText(item.tableNr)}
                  left={(props) => {
                    return <Image {...props}
                      style={[{ width: 35, height: 35 }, !item.served ? { opacity: 0.2 } : '1']}
                      source={{ uri: 'https://cdn4.iconfinder.com/data/icons/categories-5/28/34_serve_tray_service_hot_dinner_restaurant_hotel-512.png', }} />
                  }}
                  right={(props) => (
                    <View {...props} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                      <Button style={{ borderColor: "white", right: 80 }}>
                        <MaterialIcons name='shopping-cart' size={30} style={styles.shopping} />
                      </Button>
                      <Text style={{ position: 'absolute', right: 0 }}>{setPrice(item) + " KM"}</Text>
                    </View>
                  )}
                  style={styles.card}
                />
              </WingBlank>
              <WhiteSpace size="lg" />
            </TouchableOpacity>
          )
        }
        )}
        <View
  style={{
    borderBottomColor: 'white',
    borderBottomWidth: 5,
    marginVertical: 25
  }}
/>
        {guestOrders.map((item) => {
          return (
            <TouchableOpacity key={Math.random()}
              onPress={() => {
                navigation.navigate('OrderContent', { data: { item }, orders: { guestOrders } });
              }}>
              <WingBlank size="lg">
                <Card.Title
                  title={setText(item.tableNr)}
                  left={(props) => {
                    return <Image {...props}
                      style={[{ width: 35, height: 35 }, !item.served ? { opacity: 0.2 } : '1']}
                      source={{ uri: 'https://cdn4.iconfinder.com/data/icons/categories-5/28/34_serve_tray_service_hot_dinner_restaurant_hotel-512.png', }} />
                  }}
                  right={(props) => (
                    <View {...props} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                      <Button style={{ borderColor: "white", right: 80 }}>
                        <MaterialIcons name='shopping-cart' size={30} style={styles.shopping} />
                      </Button>
                      <Text style={{ position: 'absolute', right: 0 }}>{setPrice(item) + " KM"}</Text>
                    </View>
                  )}
                  style={styles.card}
                />
              </WingBlank>
              <WhiteSpace size="lg" />
            </TouchableOpacity>
          )
        }
        )}
        
      </ScrollView>
    </ImageBackground>
  )
}
