import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, AsyncStorage } from 'react-native';
import Swiper from 'react-native-swiper';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';


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
          index={1}>
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
                            <TouchableOpacity style={styles.finishBtn}> 
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
                        <Text style={styles.price}>{item.price}</Text>
                        </View>      
                        <Text style={styles.smallerText}>Ingredients: sugar, coffein, sugar, sugar, sugar, sugar</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    //backgroundColor: 'rgb(154, 145, 172)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
      flex: 1, 
      width: '100%',
      flexDirection: 'row', 
      alignContent: 'space-between',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    shoppingCart: { 
        borderColor: "white", 
        flexDirection: 'row',
    },
    shopping: {
        alignSelf: 'center',
    },
    numberInput: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#696969',
      width: 60,
    },    
    finishBtn: {
        width: 100, 
        height: 50, 
        backgroundColor: 'grey',
        marginRight: 10, 
        justifyContent: 'center',
        alignItems: 'center',
    },
  image: {
    flex: 3,
    width: Dimensions.get('window').width, 
    
  },
  textContainer: {
    flex: 1,
    //backgroundColor: 'rgba(0,0,55,50)',
    backgroundColor: 'white',
    marginBottom: 20,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },  
  headingText: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    borderBottomWidth: 1, 
    borderBottomColor: '#C0C0C0',
    backgroundColor: 'white',
  },
  text: {
    flex: 1,
    color: "#696969",  
    fontWeight: "bold", 
    fontSize: 30, 
    padding: 10,
    textAlign: "left",
    fontFamily: 'courgette-regular',
    //backgroundColor: 'rgba(0,0,55,50)'
  },
  price: {
    flex: 1,
    color: '#696969',
    padding: 10,
    fontWeight: "bold",
    textAlign: 'right',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
    fontFamily: 'courgette-regular',
  },
  smallerText: { // probati da nije bold
    flex: 1,
    color: "#696969",  
    fontWeight: "bold", 
    fontSize: 18, 
    padding: 10,
    textAlign: "left",
    //backgroundColor: '#7eb0cf',
    fontFamily: 'courgette-regular',
  },
  
});

