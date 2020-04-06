import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { WingBlank, WhiteSpace, Button } from '@ant-design/react-native';
import styles from '../styles/productStyles';
import { Card, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Toaster, { ToastStyles } from 'react-native-toaster';
import ModalProductPicker from '../components/modalProductPicker';
import { updateOrders } from '../functions/storage';
import { AsyncStorage } from 'react-native';

export default function OrderContent({ navigation }) {
  const [products, setProducts] = useState(navigation.state.params.data.item.products);
  const [price, setPrice] = useState();
  const [editInputVisible, setEditInputVisible] = useState(false);
  const [editButtonVisible, setEditButtonVisible] = useState(true);
  const [orders, setOrders] = useState(navigation.state.params.orders.orders);
  const [prevProductsQuantity, setPrevProductsQuantity] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedOrder, setClickedOrder] = useState(navigation.state.params.data.item);
  const [listEmpty, setListEmpty] = useState(false);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);

  const calculateTotalPrice = () => {
    var toPay = 0;
    products.map((item) => {
      toPay = toPay + item.times * item.price;
    });

    setPrice(Math.round(toPay * 100) / 100);
  }

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  const editButton = () => {
    setEditButtonVisible(!editButtonVisible);
    setEditInputVisible(!editInputVisible);
    setAddButtonDisabled(!addButtonDisabled);

    let newProductsQuantity = [];
    products.map(product => {
      newProductsQuantity.push({ id: product.id, quantity: product.times });
    });

    setPrevProductsQuantity(newProductsQuantity);
  }

  const checkButton = () => {
    setEditButtonVisible(!editButtonVisible);
    setEditInputVisible(!editInputVisible);
    setAddButtonDisabled(!addButtonDisabled);

    setProducts(products.filter(p => {
      return (p.times != 0)
    }));
  }

  const invokeUpdateOrders = () => {
    clickedOrder.products = products;
    updateOrders(orders);
  }

  const onChangeQuantity = (value, item) => {
    if (value === "" || allCharactersSame(value, "0")) {
      prevProductsQuantity.map(product => {
        if (product.id === item.id) item.times = product.quantity;
      });
    }
    else item.times = value.replace(/^0+/, '');

    calculateTotalPrice();
    invokeUpdateOrders();
  }

  const allCharactersSame = (str, c) => {
    if (str.length === 0) return;
    if (c == undefined || c == null) c = str[0];
    for (let i = 0; i < str.length; i++) {
      if (str[i] != c) return false;
    }
    return true;
  }

  const setPlaceholder = (item) => {
    let ph = "";
    prevProductsQuantity.map(product => {
      if (product.id === item.id) ph = product.quantity.toString();
    });

    return ph;
  }

  const addButton = () => {
    if (listEmpty == true) Alert.alert('EMPTY LIST', 'No more products available', [{
      text: 'OK'
    }]);
    else setModalVisible(true);
  }

  return (

    <ImageBackground source={require('../images/background2.png')}
      style={styles.container}>
      <ModalProductPicker modalVisible={modalVisible} setModalVisible={setModalVisible} orders={orders} products={products}
        setProducts={setProducts} invokeUpdateOrders={invokeUpdateOrders} products={products} listEmpty={listEmpty}
        setListEmpty={setListEmpty} ></ModalProductPicker>
      <View style={styles.showPrice}>
        <Text style={{ ...styles.sumbitText, fontSize: 18 }}>To pay: {price + " KM"}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {editButtonVisible &&
          <Button onPress={editButton} style={styles.editButton}>
            <MaterialIcons name='edit' size={30} style={styles.editIcon} />
          </Button>}
        {!editButtonVisible &&
          <Button onPress={checkButton} style={{ marginBottom: 20, marginLeft: 15 }}>
            <MaterialIcons name='check' size={30} style={styles.editIcon} />
          </Button>}
        <Button onPress={addButton} style={
            (addButtonDisabled && styles.addButtonDisabled) || (!addButtonDisabled && styles.addButton)} disabled={addButtonDisabled}>
          <MaterialIcons name='add' size={30} style={styles.addIcon} />
        </Button>
      </View>

      <ScrollView>
        {products.map((item) => {
          return (
            <TouchableOpacity key={item.id}
            >
              <WingBlank size="lg">
                <Card.Title
                  title={item.name}

                  left={(props) => {
                    const img = item.imageBase64;
                    return <Image {...props}
                      style={{ width: 35, height: 35 }}
                      source={{ uri: img }} />
                  }}
                  right={(props) => (
                    <View {...props} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                      {!editInputVisible &&
                        <View style={styles.tableNum}>
                          <Text>{item.times}</Text>
                        </View>}
                      {editInputVisible &&
                        <View style={styles.productQuantity} >
                          <TextInput style={styles.inputQuantity} onChangeText={(value) => onChangeQuantity(value, item)} placeholder={setPlaceholder(item)}
                            keyboardType={'numeric'} underlineColor="transparent"></TextInput>
                        </View>}
                      <Text>{item.price} KM</Text>
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
  );
}