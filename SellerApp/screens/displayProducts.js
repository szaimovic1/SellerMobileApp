import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import { Card } from 'react-native-paper';

export default function DisplayProducts() {  
    /* Privremeni testni podaci */
  const [products, setProducts] = useState ([
    { title: 'Coca Cola', price: '3.50KM', quantitiy: 200, key: '1' },
    { title: 'Limunada', price: '4.00KM', quantitiy: 100, key: '2' },
    { title: 'Čaj', price: '4.00KM', quantitiy: 50, key: '3' },
    { title: 'Kafa', price: '4.00KM', quantitiy: 300, key: '4' },
    { title: 'Topla čokolada', price: '4.00KM', quantitiy: 0, key: '6' }
  ]);
  const getStyle = (quantitiy) => {
    if(quantitiy>0 && quantitiy<=50) {
      return { //ukoliko bude potrebno i za kritične
          height: 60,
          backgroundColor: '#ffc2b3',
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderWidth: 0.2,
          borderColor: '#d9d9d9',
          borderRadius: 20,
       }
    }
    else {
      return {
        height: 60,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 0.2,
        borderColor: '#d9d9d9',
        borderRadius: 20,
      }
    }
  }
  const getTitleStyle = (quantitiy) => {
    if(quantitiy == 0) {
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
    if(quantitiy == 0) {
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
    if(quantitiy == 0) {
      return {
        color: '#e6e6e6'
      }
    } else {
      return {
        color: '#000000'
      }
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
      {products.map((item) => {
        return (
          <TouchableOpacity>
          <WingBlank size="lg">
            <Card.Title
              title={item.title}
              titleStyle={getTitleStyle(item.quantitiy)}
              subtitle="Card Subtitle"
              subtitleStyle={getSubtitleStyle(item.quantitiy)}
              left={(props) => <Image 
                style={{width: 35, height: 35}}
                source={{ uri: 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg',}}></Image>}
              right={(props) => <Text style={getTextStyle(item.quantitiy)}>{item.price}</Text>}
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
  }
});