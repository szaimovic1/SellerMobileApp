import React, { useState, useEffect } from 'react';
import { Text, View, Image, AsyncStorage, Modal, ImageBackground, Alert, Animated } from 'react-native';
import Swiper from 'react-native-swiper';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import styles from '../styles/menuStyles';
import { WingBlank } from '@ant-design/react-native';
import { Card } from 'react-native-paper';
import { postGuestOrder, guestLogIn } from '../functions/storage';
import DialogInput from 'react-native-dialog-input';
import NumericInput from 'react-native-numeric-input';
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
    'served': false,
  }); // lokalna narudžba
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [rotation, setRotation] = useState(animation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-20deg', '20deg']
  }));
  const [dialogInputVisible, setDialogInputVisible] = useState(false);

  const ringTheBell = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: -1,
          duration: 100,
          delay: 0
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 100,
          delay: 0
        }),
        Animated.timing(animation, {
          toValue: -1,
          duration: 100,
          delay: 0
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 100,
          delay: 0
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 100,
          delay: 0
        }),
      ]),
      {
        iterations: 4
      }
    ).start();
  }

  const callTheWaiter = async (inputText) => {
    if (inputText === "") return;

    const notificationMessage = "Guest is calling you to the table number " + inputText + "!"
    var token = await AsyncStorage.getItem('guestToken');

    fetch("https://cash-register-server-si.herokuapp.com/api/notifications", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ message: notificationMessage })
    }).then((res) => res.json()).then((res) => {
      console.log(res);
    }).done();

    setDialogInputVisible(!dialogInputVisible);
    ringTheBell();
  }


  var receiptItems = []
  var backupObject = {};
  var message = '';
  var tableNumber = 0;

  const getProducts = async () => {
    var TOKEN = await AsyncStorage.getItem('guestToken');
    fetch("https://cash-register-server-si.herokuapp.com/api/products", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + TOKEN
      }
    })
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
        console.log("guestToken", TOKEN);
        return products;
      })
      .done();
  }

  useEffect(() => {
    guestLogIn();
    getProducts();
  }, [])

  // neki useEffect za spremanje id-a i kolicine itema
  useEffect(() => {
    if (orderProducts.length != 0)
      orderProducts.map((item) => {
        receiptItems.push({ id: item.id, quantity: item.times });
      });
    console.log('receipt je: ', receiptItems);
    // backupObject se koristi za krajnje slanje na server
    tableNumber = tableNr;
    message = tableNumber;
    backupObject = { message, receiptItems };
    console.log('broj stola je: ', tableNumber);
    console.log('backupObject je: ', backupObject);

  }, [receiptItems]);
  //

  const addNewItemToOrder = (item, timesPressed) => {
    // ako je element već u nizu, obriše se
    orderProducts.map((orderObject) => {
      if (orderObject.name === item.name) {
        setPrice(Math.round((price - orderObject.price * orderObject.times) * 100) / 100);
        var index = orderProducts.indexOf(orderObject);
        orderProducts.splice(index, 1);
        return;
      }
    });
    // sada se doda novi objekat
    if (timesPressed != 0) {
      setOrderProducts(selectedProducts => [...selectedProducts, {
        'id': item.id,
        'name': item.name,
        'times': timesPressed,
        'price': item.price,
        'imageBase64': item.imageBase64,
      }]);
      setPrice(Math.round((price + item.price * timesPressed) * 100) / 100);
    }

    //console.log(timesPressed);
  }

  //slanje guest narudzbe na server
  const submitToServer = () => {
    if (receiptItems.length == 0) {
      Alert.alert('OOPS!', 'Your order is empty!', [
        {
          text: 'OK', onPress: () => navigation.navigate('Start')
        }])
      console.log('nije poslalo: ', backupObject);
    }
    else if (tableNumber <= 0) {
      Alert.alert('OOPS!', 'Invalid table number!', [
        {
          text: 'OK'
        }])
    }
    else {
      postGuestOrder(backupObject);
      Alert.alert('Submited!', 'Your order is on its way!', [
        {
          text: 'OK', onPress: () => navigation.navigate('Start')
        }])
      console.log('na server se šalje: ', backupObject);
    }
  }

  const [visibility, setVisibility] = useState(false);
  const showModal = () => setVisibility(true);
  const hideModal = () => setVisibility(false);
  const [price, setPrice] = useState(0);
  const [tableNr, setTableNr] = useState('');

  if (fontsLoaded) {
    return (
      <View style={{flex: 1,  backgroundColor: 'white',}}>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={{
              borderStyle: "solid",
              borderColor: 'grey',
              borderWidth: 2,
              marginLeft: 5,
              height: 45,
              borderRadius: 10,
              padding: 0,
              margin: 0
            }}
            onPress={() => navigation.navigate('Start')}>
            <MaterialIcons name='close' size={30} style={{
              marginLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              opacity: 0.5
            }} />
          </TouchableOpacity>
          <Animated.View style={{ transform: [{ rotate: rotation }], marginLeft: 20, marginTop: 20,}}>
            <MaterialIcons name="notifications-active" onPress={() => { setDialogInputVisible(!dialogInputVisible); }}
            size={80} style={{ marginBottom: 30, color: "#fb5b5a" }}></MaterialIcons>
          </Animated.View>
          <TouchableOpacity
            onPress={showModal}
            style={styles.finishBtn} >
            <Text style={{ color: "white", fontWeight: 'bold', }}>Buy</Text>
          </TouchableOpacity>
        </View>      
        <Swiper
          loop={false}
          showsPagination={false}
          index={0}>
          {products != undefined && products.length != 0 && products.map((item) => {
            var timesPressed = '0';
            orderProducts.map((orderObject) => {
              if (orderObject.name === item.name) {
                timesPressed = orderObject.times.toString();
                return;
              }

            });
            return (
              <View style={styles.container} key={item.id}>
                <DialogInput isDialogVisible={dialogInputVisible}
                  modalStyle={{ backgroundColor: "orangered" }}
                  dialogStyle={{ borderColor: "black", borderRadius: 30 }}
                  textInputProps={{ keyboardType: 'numeric' }}
                  title={"WANT TO CALL THE WAITER?"}
                  message={"We are glad to be there for you!"}
                  hintInput={"Enter your table number"}
                  submitInput={(inputText) => { callTheWaiter(inputText); }}
                  closeDialog={() => { setDialogInputVisible(!dialogInputVisible); }}
                  submitText="MAKE A CALL">
                </DialogInput>
                <Modal
                  visible={visibility}
                  style={{ presentationStyle: "fullScreen" }}>
                  <ImageBackground
                    source={require('../images/greyBackground.jpg')}
                    style={{ height: "100%", width: "100%", }}>
                    <View style={styles.headerForOrder}>
                      <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                        letterSpacing: 1,
                        alignSelf: "center",
                        paddingLeft: 20
                      }}>Your choice</Text>
                      <TouchableOpacity onPress={() => { navigation.navigate('Start'); }}>
                        <MaterialIcons name='delete' size={40} style={styles.deleteIcon} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.viewOfInput}>
                      <Text style={styles.sumbitText2}>Enter table number &#x261E;</Text>
                      <TextInput
                        keyboardType='number-pad'
                        style={styles.tableNrInput}
                        placeholder={tableNr}
                        onChange={(number) => {
                          newOrder.tableNr = number.nativeEvent.text;
                          setTableNr(number.nativeEvent.text);
                        }}>
                      </TextInput>
                    </View>
                    <ScrollView>
                      {orderProducts.map((item) => {
                        return (
                          <TouchableOpacity key={item.id}>
                            <WingBlank size="lg">
                              <Card.Title
                                title={item.name}
                                left={(props) => {
                                  return <Image {...props}
                                    style={{ width: 35, height: 35 }}
                                    source={{ uri: item.imageBase64 }} />
                                }}
                                right={(props) => (
                                  <View {...props} style={{...styles.viewOfInputDisabled, width: 130}}>  
                                    <Text style={styles.tableNum}>{item.times}</Text>
                                    <Text style = {{flex: 5, textAlign: "center", marginBottom: 3}}>{item.price} KM</Text>
                                  </View>
                                )}
                                style={styles.card}
                              />
                            </WingBlank>
                          </TouchableOpacity>
                        )
                      })}
                    </ScrollView>
                    <Text style={styles.sumbitText}>To pay: {price + " KM"}</Text>
                    <View style={styles.footerForOrder}>
                      <Button
                        onPress={hideModal}
                        style={styles.backBtn}>
                        <Text style={styles.btnText}>Go back to edit</Text>
                      </Button>
                      <Button
                        onPress={submitToServer}
                        style={styles.orderBtn}>
                        <Text style={styles.btnText}>Order &#x2714;</Text>
                      </Button>
                    </View>
                  </ImageBackground>
                </Modal>
                  <NumericInput
                    minValue={0}
                    onChange={value => addNewItemToOrder(item, value)}
                    rounded={true}
                    rightButtonBackgroundColor='#FA8072'
                    leftButtonBackgroundColor='grey'
                    totalWidth={200} 
                    totalHeight={50}
                    iconStyle={{ color: 'white' }}
                    containerStyle={{marginBottom:10}}
                  />
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
                    <Text style={styles.smallerText}>{item.description}</Text>
                  </ScrollView>
                </View>

              </View>
            );
          })}

        </Swiper>
      </View>
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

