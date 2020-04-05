import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { WingBlank, WhiteSpace, Button } from '@ant-design/react-native';
import styles from '../styles/productStyles';
import { Card } from 'react-native-paper';
import { saveNewOrder } from '../functions/storage';
import { MaterialIcons } from '@expo/vector-icons';
import {AsyncStorage, Alert} from 'react-native';

export default function OrderContent ({navigation}) {
    const [products, setProducts] = useState(navigation.state.params.data.item.products);
    const [price, setPrice] = useState();
    const [tableNr, setTableNr] = useState(navigation.state.params.data.item.tableNr);
    const [servirano, setServirano] = useState(navigation.state.params.data.item.Serverd)
    var receiptItems = [];
    var pomocniObjekat = {};
    useEffect(() => {
      console.log('broj stola', tableNr);
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
        setPrice(toPay);
    }, [price]);


    async function removeCurrentOrder(id) {
      try {
          await AsyncStorage.removeItem(id);
          console.log('izbrisalo');
          return true;
      }
      catch(exception) {
        console.log('nije izbrisalo');
          return false;
      }
  }
    /* POST zahtjev serveru za slanje narudzbe*/

    async function postOrder () {
      
      var data = pomocniObjekat;
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
        console.log(res);
        Alert.alert('Submited!', 'Order was successfully submitted.', [
          {
            text: 'OK', onPress: () => console.log('alert close')
          }])
          console.log('table broj: ', tableNr);
          removeCurrentOrder(tableNr);
      }).catch((error) => console.error(error))
        .done();
    }

    
    const submitOrder = () => {
    
      postOrder();
      
      
    }
    return (
        <ImageBackground source={require('../images/background2.png')} 
        style={styles.container}>
         <View style={styles.showPrice}>
         <Text style={{...styles.sumbitText, fontSize: 18}}>To pay: {price + " KM"}</Text>
         </View>
         <View style={{flexDirection: "row"}}>
         <MaterialIcons name='edit' size={30} style={styles.editIcon} />
           <MaterialIcons name='add' size={30} style={styles.addIcon} />
         </View>
         
        <ScrollView>
          {products.map((item) => { 
            return (
              <TouchableOpacity key={item.id}
              >
                <WingBlank size="lg">
                  <Card.Title            
                    title={item.name}
                    titleStyle={item.quantity}
                    subtitleStyle={item.quantity}

                    left={(props) => {
                      const img = item.imageBase64;
                      return <Image {...props} 
                        style={{width: 35, height: 35}}
                        source={{ uri: img }} /> 
                    }}
                    right={(props) => (
                      <View {...props} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                          <View style={styles.tableNum}>
                          <Text>{item.times}</Text>
                          </View>                      
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
        <TouchableOpacity onPress={submitOrder}>
          <View style={styles.submitOrderButton}>
           <Text style={styles.submitOrderButtonText}>Submit order</Text>
           </View>
         </TouchableOpacity>
      </ImageBackground>
    );
}