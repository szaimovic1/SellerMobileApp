
import React, { useState, useEffect }  from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ImageBackground, 
        Modal, TouchableHighlight, RefreshControl, 
        Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import { Card } from 'react-native-paper';
import {AsyncStorage} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Filter from '../components/filter';
import styles from '../styles/productStyles';


export default function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
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
        const img = item.imageBase64;
        setModalData({name: item.name,
            price: item.price, 
            image: img, 
            unit: item.measurementUnit, 
            discount: item.discount, 
            quantity: item.quantity
          })
          return;
      }
      }
    )
  }
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
        color: '#e6e6e6',
      }
    } 
    
    else {
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
  
  const isProductQuantitySmall = (quantity) => {
    var small=false;
    if(Number(quantity)>=0 && Number(quantity)<10) {
      small=true;
    }
    if(small) {
      return(<FontAwesome name='exclamation-circle' color='red' size={25}/>);
    }
  }
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
        setProducts(products);
        setRefreshing(false);
        return products;
      })
      .done();
  }

  useEffect(() => {
    getProducts();
  }, []);

   const updateList = (specificProducts) => {
      setProducts(specificProducts);
    }

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <ImageBackground source={require('../images/background2.png')} 
        style={[styles.container, 
        modalVisible ? {opacity: 0.05} : '1']}>
        <Modal
          style={styles.centeredView}
          animationType="fade"
          transparent={true}
          visible={modalVisible}>
          <View style={styles.modal}>
              <Image
                style={styles.modalImage}
                source={{ uri: modalData.image }}
              />
          </View>
          <View style={styles.centeredView}>
            <View style={{...styles.modalView, marginBottom: '50%'}}>
                <Text style={styles.modalTitle}>{modalData.name}</Text>
              <Text style={styles.modalText}>Price: <Text style={{fontWeight: "bold"}}>{modalData.price} KM</Text></Text>
              <Text style={getStyle(modalData.quantity)}>Quantity: <Text style={{fontWeight: "bold"}}>{modalData.quantity} {modalData.unit}</Text><Text> {isProductQuantitySmall(modalData.quantity)}</Text></Text>
              <Text style={styles.modalText}>Discount: <Text style={{fontWeight: "bold"}}>{modalData.discount} %</Text></Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: 'rgba(0,0,55,50)' }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>&#215;</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Filter updateList={updateList} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getProducts} />
          }>
          {products.map((item) => {
            return (
              <TouchableOpacity key={item.id}
                  onLongPress={ () => {
                  ModalFetcher(item.id); 
                  setModalVisible(true);}}>
                <WingBlank size="lg">
                  <Card.Title            
                    title={item.name}
                    titleStyle={getTitleStyle(item.quantity)}
                    subtitleStyle={getSubtitleStyle(item.quantity)}

                    left={(props) => {
                      const img = item.imageBase64;
                      return <Image 
                        style={[{width: 35, height: 35}, modalVisible ? {opacity: 0} : '1']}
                        source={{ uri: img }} /> 
                    }}
                    right={(props) => <Text style={[getTextStyle(item.quantity),
                      modalVisible ? {color: 'rgba(0,0,0,0.7)'} : '']}>{item.price} KM</Text>}
                    style={[styles.card, 
                      modalVisible ? {backgroundColor: 'rgba(0,0,0,0.7)'} : '', 
                      modalVisible ? {borderColor: 'rgba(0,0,0,0.7)'} : '']}
                  />
                </WingBlank>
                <WhiteSpace size="lg" />
                </TouchableOpacity>

            )
          }
          )}
        </ScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>    
  )             
}