import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions, Modal, TouchableHighlight} from 'react-native';
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import { Card } from 'react-native-paper';
import {AsyncStorage} from 'react-native';

export default function DisplayProducts() {  
  const [products, setProducts] = useState ([]);
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
            <Text style={styles.modalText}>Količina: <Text style={{fontWeight: "bold"}}>{modalData.quantity} {modalData.unit}</Text></Text>
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
          <WingBlank size="lg">
            <Card.Title
              title={item.name}
              titleStyle={{color:'black', paddingTop: 10}}
              subtitleStyle={{color:'black', paddingBottom: 10}}
              left={(props) => <Image 
                style={{width: 35, height: 35}}
                source={{ uri: 'data:image/gif;base64,${item.imageBase64}'}}></Image>}
              right={(props) => <Text>{item.price} {item.measurementUnit}</Text>}
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

