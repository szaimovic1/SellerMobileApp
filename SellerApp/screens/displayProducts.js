import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import { Card } from 'react-native-paper';
import {AsyncStorage} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function DisplayProducts() {  
  const [products, setProducts] = useState ([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
 
  getProducts = async () => {
    var TOKEN = await AsyncStorage.getItem('token');
    fetch("https://cash-register-server-si.herokuapp.com/api/products", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + TOKEN
      }
    })
    .then((response) => response.json())
    .then((products) => {
      console.log(products);
      setProducts(products);
      setProductsLoaded(true);
      return products;
    })
    .done();
  }
   
  if (!productsLoaded) {
    getProducts();
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity activeScale={0.7} style={styles.rightIcon}>
        <MaterialIcons name='refresh' size={40}  onPress={getProducts} />
     </TouchableOpacity>
      <ScrollView>
      {products.map((item) => {
        return (
          <TouchableOpacity key={item.id}>
          <WingBlank size="lg">
            <Card.Title              
              title={item.name}
              titleStyle={{color:'black', paddingTop: 10}}
              subtitleStyle={{color:'black', paddingBottom: 10}}
              left={(props) => {
                const img = item.imageBase64;
                return <Image 
                  style={{width: 35, height: 35}}
                  source={{ uri: img }} /> 
              }}

              right={(props) => <Text>{item.price} KM</Text>}
              style={styles.card}
            />
          </WingBlank>
          <WhiteSpace size="lg" />
          </TouchableOpacity>
           
        )}
      )}
      </ScrollView>                       
    </View>
  )             
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
  card: {
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderColor: '#d9d9d9',
    borderRadius: 20,
  },
  refreshBtn: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
    width: 160,
  },
  rightIcon : {
    position: 'absolute',
    left: 20,
    marginTop: 20,
    marginBottom: 30,
  }
});