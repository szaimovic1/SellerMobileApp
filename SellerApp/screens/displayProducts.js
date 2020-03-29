import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal, TouchableHighlight, Dimensions} from 'react-native';
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import { Card } from 'react-native-paper';

export default function DisplayProducts() {  
    /* Dohvatanje proizvoda */
  const [products, setProducts] = useState ([
    { product: 
      {id: '67',
      name: 'Coca Cola',
      price: '1.20',
      image: 'https://eatforum.org/content/uploads/2018/05/table_with_food_top_view_900x700.jpg',
      unit: 'l',
      discount: {
        percentage: '0'
      }
      },
      quantity: '150.0'
    },
    { product: 
      {id: '67',
      name: 'Limunada',
      price: '5.20',
      image: 'https://eatforum.org/content/uploads/2018/05/table_with_food_top_view_900x700.jpg',
      unit: 'l',
      discount: {
        percentage: '0'
      }
      },
      quantity: '50.0'
    },
    { product: 
      {id: '67',
      name: 'Čaj',
      price: '1',
      image: 'https://eatforum.org/content/uploads/2018/05/table_with_food_top_view_900x700.jpg',
      unit: 'k',
      discount: {
        percentage: '0'
      }
      },
      quantity: '20.0'
    },
    { product: 
      {id: '67',
      name: 'Topla čokolada',
      price: '5',
      image: 'https://eatforum.org/content/uploads/2018/05/table_with_food_top_view_900x700.jpg',
      unit: 'l',
      discount: {
        percentage: '20'
      }
      },
      quantity: '20.0'
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  /* Podaci o proizvodu za koji tražimo dodatne informacije. */
  const [modalData, setModalData] = useState({name: null, 
    price: null, 
    image: null, 
    unit: null, 
    discount: null, 
    quantity: null});

  /* Popunjavanje dodatnih informacija o nekom proizvodu */  
  const ModalFetcher = (text) =>{
    products.map((item) => {
      if(text == item.product.name){
        setModalData({name: item.product.name,
            price: item.product.price, 
            image: item.product.image, 
            unit: item.product.unit, 
            discount: item.product.discount.percentage, 
            quantity: item.quantity
          })
          return;
      }
      }
    )
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
              source={{ uri: modalData.image }}
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
          <TouchableOpacity onPress={ () => {
            ModalFetcher(item.product.name); 
            setModalVisible(true);}}
          >
          <WingBlank size="lg">
            <Card.Title
              title={item.product.name}
              titleStyle={{color:'black', paddingTop: 10}}
              //subtitle="Card Subtitle"
              subtitleStyle={{color:'black', paddingBottom: 10}}
              left={(props) => <Image 
                style={{width: 35, height: 35}}
                source={{ uri: 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg',}}></Image>}
              right={(props) => <Text>{item.product.price}</Text>}
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