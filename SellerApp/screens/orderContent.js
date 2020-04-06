import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { WingBlank, WhiteSpace, Button } from '@ant-design/react-native';
import styles from '../styles/productStyles';
import { Card } from 'react-native-paper';
import { deleteUnservedOrder } from '../functions/storage';
import { MaterialIcons } from '@expo/vector-icons';
import {AsyncStorage, Alert} from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default function OrderContent ({navigation}) {
    const [products, setProducts] = useState(navigation.state.params.data.item.products);
    const [price, setPrice] = useState();
    const [brojStola, setTableNr] = useState(navigation.state.params.data.item.tableNr);
    const [servirano, setServirano] = useState(navigation.state.params.data.item.Serverd)
    const [narudzba, setNarudzba] = useState(navigation.state.params.data.item)
    var receiptItems = [];
    var pomocniObjekat = {};
    //var zaBrisanje = {};
    //var orders = [];
    //var newOrder = [];
    //var tableNr = 0;
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
        setPrice(toPay);
    }, [price]);
    

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

  /*
   async function removeCurrentOrder(id) {
      newOrder = {
        tableNr : id
      }
      orders = [newOrder];
      console.log(newOrder);
      try {
          //const TOKEN = await AsyncStorage.getItem('token');
          await AsyncStorage.removeItem('orders', () => { console.log('izbrisano')});
          
          return true;
      }
      catch(exception) {
        console.log('nije izbrisalo');
          return false;
      }
    }
    */

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
        //removeCurrentOrder(brojStola);
        deleteOrder(narudzba);
        console.log(res);
        Alert.alert('Submited!', 'Order was successfully submitted.', [
          {
            text: 'OK'
          }])
          navigation.navigate('DisplayOrders');
          console.log('table broj: ', brojStola);
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