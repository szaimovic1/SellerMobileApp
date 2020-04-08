import React, { useState, useEffect } from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';
import Swiper from 'react-native-swiper';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from '../styles/menuStyles';


const getFonts = () => {
  return Font.loadAsync({
    'courgette-regular': require('../assets/fonts/Courgette-Regular.ttf')
  });
}

export default function GuestMenu({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [newOrder, setNewOrder] = useState({
    'products': orderProducts,
    'tableNr': 0,
    'served': null,
  }); // lokalna narudžba

  const getProducts = async () => {
    var TOKEN = await AsyncStorage.getItem('token');
    fetch("https://cash-register-server-si.herokuapp.com/api/products", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + TOKEN
      }
    })
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
        return products;
      })
      .done();
  }

  useEffect(() => {
      getProducts();
  }, [])

  const addNewItemToOrder = (item, timesPressed) => {
    // ako je element već u nizu, obriše se
    orderProducts.map((orderObject) => {
      if (orderObject.name === item.name) {
        var index = orderProducts.indexOf(orderObject);
        orderProducts.splice(index, 1);
        return;
      }
    });
    // sada se doda novi objekat
    setOrderProducts(selectedProducts => [...selectedProducts, {
      'id': item.id,
      'name': item.name,
      'times': timesPressed,
      'price': item.price,
      'imageBase64': item.imageBase64,
    }]);
  }

  if (fontsLoaded) {
    return (
      <Swiper
          loop={false}
          showsPagination={false}
          index={0}>
              {products != undefined && products.map((item) => {
                  var timesPressed = '0';
                  orderProducts.map((orderObject) => {
                    if (orderObject.name === item.name) {
                      timesPressed = orderObject.times.toString();
                      return;
                    }
      
                  });
                  return (
                    <View style={styles.container} key={item.id}>  
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Start')}>
                                <MaterialIcons name='close' size={30} style={{marginLeft: 10,}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shoppingCart}>
                                <MaterialIcons name='shopping-cart' size={30} style={styles.shopping} />
                                <TextInput 
                                    keyboardType='number-pad' 
                                    style={styles.numberInput}
                                    placeholder='0'
                                    onChange={(number) => {
                                        if (item.quantity != 0) {
                                            timesPressed = number;
                                            addNewItemToOrder(item, timesPressed);
                                        }
                                    }}>                    
                                </TextInput>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.finishBtn} > 
                                <Text style={{color:"white", fontWeight: 'bold',}}>Finish</Text>
                            </TouchableOpacity>
                        </View>
                    <Image
                        style={styles.image}
                        source={{ uri: item.imageBase64 }}
                        resizeMode="contain"
                    />          
                    <View style={styles.textContainer}>
                        <View style={styles.headingText}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.price}>{item.price} KM</Text>
                        </View>      
                        <ScrollView>
                        <Text style={styles.smallerText}>Ingredients: sugar, coffein, sugar, sugar, sugar, sugar,fds,fds,fmfrjfdjfjijfkdjsmkfsdlmfsd,fsdkfdlslfksdkfjdsfjdsfjidsjifsdfkdskdsjjdskdskadkfjsjfsdjkdsfjdsjjfdkfsdjfdsjij</Text>
                        </ScrollView>
                    </View>
                    
                    </View>
                  );
              })}
        
      </Swiper>
    );
  } else {
    return (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
    />
    );
  }
}

