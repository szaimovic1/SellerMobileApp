import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import { WingBlank, WhiteSpace, Button } from '@ant-design/react-native';
import styles from '../styles/productStyles';
import { Card, TextInput } from 'react-native-paper';
import { deleteUnservedOrder } from '../functions/storage';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import orderStyles from '../styles/orderStyles';
import CheckBox from 'react-native-check-box';
import { updateOrders } from '../functions/storage';
import Toaster, { ToastStyles } from 'react-native-toaster';
import ModalProductPicker from '../components/modalProductPicker';


export default function OrderContent ({navigation}) {
    const [products, setProducts] = useState(navigation.state.params.data.item.products);
    const [price, setPrice] = useState();
    const [editInputVisible, setEditInputVisible] = useState(false);
    const [editButtonVisible, setEditButtonVisible] = useState(true);
    const [orders, setOrders] = useState(navigation.state.params.orders.orders);
    const [prevProductsQuantity, setPrevProductsQuantity] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [brojStola, setTableNr] = useState(navigation.state.params.data.item.tableNr);
    const [narudzba, setNarudzba] = useState(navigation.state.params.data.item);
    const [served, setServed] = useState(navigation.state.params.data.item.served);
    const [clickedOrder, setClickedOrder] = useState(navigation.state.params.data.item);
    const [listEmpty, setListEmpty] = useState(false);
    const [addButtonDisabled, setAddButtonDisabled] = useState(true);
    const [orderPrice, setOrderPrice] = useState();
    if(served == null) {
      setServed(false);
    
    } 
    if(price == 'undefined'){
      calculateTotalPrice();
    }
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
    var receiptItems = [];
    var pomocniObjekat = {};
    useEffect(() => {
      var toPay = 0;
      receiptItems=[];
      pomocniObjekat = {};
      {products.map((item) => {
        toPay = toPay + item.times*item.price;
        /* u niz reciptItems ubacujem prozivode iz narudzbe i kolicinu */
        receiptItems.push({id: item.id, quantity: item.times});
      });
      }
      /* pomocniObjekat je objekat koji sadrzi niz reciptItems, jer ga kao takvog saljemo serveru */
      pomocniObjekat = {receiptItems};
        setOrderPrice(toPay);
    }, 
    [orderPrice]);
    const deleteOrder = async (order) => {
     let indexOfOrder=0;
     try {
       // uzmemo postojeće orders iz AsyncStorage
       const existingOrders = await AsyncStorage.getItem('orders');
       let ordersRec = JSON.parse(existingOrders);
      //pretrazimo da nadjemo nasu narudzbu
       for(let i=0; i<ordersRec.length; i++){
         indexOfOrder=i;
         if(ordersRec[i].products.length != order.products.length) continue;
         if(ordersRec[i].tableNr != order.tableNr) continue;
         for(var j=0;j<ordersRec[i].products.length; j++){
             if(ordersRec[i].products[j].id!=order.products[j].id) break;
             if(ordersRec[i].products[j].times!=order.products[j].times) break;
         }
         if(j==ordersRec[i].products.length){
           //znaci da je nasao istu narudzbu i da je treba obrisati
           ordersRec.splice(indexOfOrder, 1);
           break;
         }
       }
       // spasimo novi niz narudžbi
      await AsyncStorage.setItem('orders', JSON.stringify(ordersRec) )
         .then( ()=>{
          console.log('Uspjesno obrisana narudzba');
         } )
         .catch( ()=>{
          Alert.alert ('Error', 'Error deleting order!',[{
            text: 'Okay'
          }]);
         } )
      } catch (error) {
      Alert.alert ('Error', 'Error deleting order!',[{
      text: 'Okay'
      }]);
    } 
  }   

    /* POST zahtjev serveru za slanje narudzbe*/

  async function postOrder () { 
    var data = pomocniObjekat;
    console.log(data);
    var TOKEN = await AsyncStorage.getItem('token');
    fetch("https://cash-register-server-si.herokuapp.com/api/orders", {
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
      deleteOrder(narudzba);
      console.log(res);
      Alert.alert('Submited!', 'Order was successfully submitted.', [{text: 'OK'}])
      navigation.navigate('DisplayOrders');
    }).catch((error) => console.error(error)).done();
  }
  const submitOrder = () => {
    postOrder();
  }
  const updateOrderState = async (order) => {
    let indexOfOrder=0;
    try {
    // uzmemo postojeće orders iz AsyncStorage
    const existingOrders = await AsyncStorage.getItem('orders');
    let ordersRec = JSON.parse(existingOrders);
    //pretrazimo da nadjemo nasu narudzbu
    for(let i=0; i<ordersRec.length; i++){
      indexOfOrder=i;
      if(ordersRec[i].products.length != order.products.length) continue;
      if(ordersRec[i].tableNr != order.tableNr) continue;
      for(var j=0;j<ordersRec[i].products.length; j++){
        if(ordersRec[i].products[j].id!=order.products[j].id) break;
        if(ordersRec[i].products[j].times!=order.products[j].times) break;
      }
      if(j==ordersRec[i].products.length){
        //znaci da je nasao istu narudzbu i azurira njenu usluzenost
        ordersRec[indexOfOrder].served = !ordersRec[indexOfOrder].served;
        break;
      }
    }
    // spasimo novi niz narudžbi
    await AsyncStorage.setItem('orders', JSON.stringify(ordersRec)).then( ()=>{
      console.log('Uspjesno editovana usluzenost narudzbe');
      }).catch( ()=>{
        Alert.alert ('Error', 'Error updating order!',[{text: 'Okay'}]);
      })
    } catch (error) {
       Alert.alert ('Error', 'Error updatig order!',[{
       text: 'Okay'
     }]);
    } 
  }
  const changeOrderServeState = () => {
    setServed(!served);
    updateOrderState(navigation.state.params.data.item);   
  }
  
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
    if (listEmpty == true) Alert.alert('EMPTY LIST', 'No more products available', [{text: 'OK'}]);
    else setModalVisible(true);
  }
  return (
    <ImageBackground source={require('../images/background2.png')} style={styles.container}>
      <ModalProductPicker modalVisible={modalVisible} setModalVisible={setModalVisible} orders={orders} products={products}
        setProducts={setProducts} invokeUpdateOrders={invokeUpdateOrders} products={products} listEmpty={listEmpty}
        setListEmpty={setListEmpty} >
      </ModalProductPicker>
      <View style={styles.showPrice}>
        <Text style={{...styles.sumbitText, fontSize: 18}}>To pay: {price +" KM"}</Text>
      </View>
      <View style={{flexDirection: "row"}}>
        {
          editButtonVisible &&
          <Button onPress={editButton} style={styles.editButton}>
            <MaterialIcons name='edit' size={30} style={styles.editIcon} />
          </Button>
        }
        {
          !editButtonVisible &&
          <Button onPress={checkButton} style={{ marginBottom: 20, marginLeft: 15 }}>
            <MaterialIcons name='check' size={30} style={styles.editIcon} />
          </Button>
        }
        <View style = {orderStyles.orderServedView}>
          <Text style={orderStyles.textServed}>Served: </Text>
          <CheckBox isChecked={served} onClick={changeOrderServeState}/>
        </View>
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

      <View style={styles.btnContainer2}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={submitOrder}>
            <View style={styles.submitOrderButton}>
              <Text style={styles.submitOrderButtonText}>Submit order</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={ () => {          
              deleteUnservedOrder(navigation.state.params.data.item);             
              navigation.navigate('DisplayOrders');
            }}
            underlayColor='#fff'>
            <Text style={styles.submitOrderButtonText}>Delete order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}