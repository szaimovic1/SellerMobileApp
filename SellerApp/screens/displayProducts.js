<<<<<<< HEAD
import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions, Modal, TouchableHighlight} from 'react-native';
=======
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, RefreshControl} from 'react-native';
>>>>>>> 59cbccc27dcae373d75128c142a388df52c76c09
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import { Card } from 'react-native-paper';
import {AsyncStorage} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function DisplayProducts() {  
  const [products, setProducts] = useState ([]);
<<<<<<< HEAD
  const [productsLoaded, setProductsLoaded] = useState(false);
 
  const [modalVisible, setModalVisible] = useState(false);
  /* Podaci o proizvodu za koji tražimo dodatne informacije. */
  const [modalData, setModalData] = useState({name: null, 
    price: null, 
    image: null, 
    unit: null, 
    discount: null, 
    quantity: null});
  /* Popunjavanje dodatnih informacija o nekom proizvodu */  
  const ModalFetcher = (id) =>{
    products.map((item) => {
      if(id == item.id){
        setModalData({name: item.name,
            price: item.price, 
            image: item.imageBase64, 
            unit: item.measurementUnit, 
            discount: item.discount, 
            quantity: item.quantity
          })
          return;
      }
      }
    )
  }
=======
  const [refreshing, setRefreshing] = React.useState(false);
>>>>>>> 59cbccc27dcae373d75128c142a388df52c76c09

  getProducts = async () => {
    setRefreshing(true);
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
      setRefreshing(false);
      return products;
    })
    .done();
  }
<<<<<<< HEAD
  const getStyle = (quantitiy) => {
    if(Number(quantitiy)>=0 && Number(quantitiy)<10) {
      return { //ukoliko bude potrebno i za kritične
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        color: 'red'
       }
    }
    else {
      return {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
      }
    }
  }
  const getTitleStyle = (quantitiy) => {
    if(Number(quantitiy) == 0) {
      return {
        paddingTop: 10,
        color: '#e6e6e6'
      }
    } else {
      return {
        paddingTop: 10,
        color: '#000000'
      }
    }
  }
  const getSubtitleStyle = (quantitiy) => {
    if(Number(quantitiy) == 0) {
      return {
        paddingBottom: 10,
        color: '#e6e6e6'
      }
    } else {
      return {
        paddingBottom: 10,
        color: '#000000'
      }
    }
  }
  const getTextStyle = (quantitiy) => {
    if(Number(quantitiy) == 0) {
      return {
        color: '#e6e6e6'
      }
    } else {
      return {
        color: '#000000'
      }
    }
  }
  
  if (!productsLoaded) {
    getProducts();
  }

  const isProductQuantitySmall = (quantity) => {
    var small=false;
    if(Number(quantity)>=0 && Number(quantity)<10) {
      small=true;
    }
    if(small) {
      return(<FontAwesome name='exclamation-circle' color='red' size={25}/>);
    }
  }
  
  return (
    <View style={[styles.container, modalVisible ? {backgroundColor: 'rgba(0,0,0,0.7)'} : '']}>
      <Modal
        style={styles.centeredView}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modal}>
            <Image
              style={styles.modalImage}
              source={{ uri: 'data:image/gif;base64,${modalData.image}' }}
            />
        </View>
        <View style={styles.centeredView}>
          <View style={{...styles.modalView, marginBottom: '80%'}}>
              <Text style={styles.modalTitle}>{modalData.name}</Text>
            <Text style={styles.modalText}>Cijena: <Text style={{fontWeight: "bold"}}>{modalData.price} KM</Text></Text>
            <Text style={getStyle(modalData.quantity)}>Količina: <Text style={{fontWeight: "bold"}}>{modalData.quantity} {modalData.unit}</Text><Text> {isProductQuantitySmall(modalData.quantity)}</Text></Text>
            <Text style={styles.modalText}>Popust: <Text style={{fontWeight: "bold"}}>{modalData.discount} %</Text></Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: 'rgba(0,0,0,0.7)' }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>&#215;</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <ScrollView>
      {products.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            onPress={ () => {
            ModalFetcher(item.id); 
            setModalVisible(true);}}
          >
=======
   
  useEffect(() => {
    getProducts();
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getProducts} />
        }>
      {products.map((item) => {
        return (
          <TouchableOpacity key={item.id}>
>>>>>>> 59cbccc27dcae373d75128c142a388df52c76c09
          <WingBlank size="lg">
            <Card.Title              
              title={item.name}
<<<<<<< HEAD
              titleStyle={getTitleStyle(item.quantity)}
              subtitleStyle={getSubtitleStyle(item.quantity)}
              left={(props) => <Image 
                style={{width: 35, height: 35}}
                source={{ uri: 'data:image/gif;base64,${item.imageBase64}'}}></Image>}
              right={(props) => <Text style={getTextStyle(item.quantity)}>{item.price} KM</Text>}
=======
              titleStyle={{color:'black', paddingTop: 10}}
              subtitleStyle={{color:'black', paddingBottom: 10}}
              left={(props) => {
                const img = item.imageBase64;
                return <Image 
                  style={{width: 35, height: 35}}
                  source={{ uri: img }} /> 
              }}

              right={(props) => <Text>{item.price} KM</Text>}
>>>>>>> 59cbccc27dcae373d75128c142a388df52c76c09
              style={styles.card}
            />
          </WingBlank>
          <WhiteSpace size="lg" />
          </TouchableOpacity>
           
        )}
      )}
<<<<<<< HEAD
      </ScrollView>
                        
=======
      </ScrollView>                       
>>>>>>> 59cbccc27dcae373d75128c142a388df52c76c09
    </View>
  )             
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
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
<<<<<<< HEAD
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    justifyContent: "center",
    height: 40,
    width: 40,  
    borderRadius:400
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center", 
    fontSize: 30
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20
  },
  modalTitle: {
    color: "white", 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    fontWeight: "bold", 
    fontSize: 30, 
    marginBottom: 30, 
    padding: 10,
    textAlign: "center", 
    width: 250
  },
  modalImage: { width: Dimensions.get('window').width, 
  height: '75%', 
  resizeMode: 'stretch', 
  opacity: 0.9
}
});

=======
  rightIcon : {
    position: 'absolute',
    left: 20,
    marginTop: 20,
    marginBottom: 30,
  }
});
>>>>>>> 59cbccc27dcae373d75128c142a388df52c76c09
