import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Card, WingBlank, WhiteSpace } from '@ant-design/react-native';
import CardBody from '@ant-design/react-native/lib/card/CardBody';

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
    if(quantitiy > 50) {
      return {
        borderRadius: 20,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#eee',
        shadowOpacity: 1.0, 
      }
     }
    else if(quantitiy>0 && quantitiy<=50) {
      return {
        backgroundColor: '#ffc2b3',
        borderRadius: 20,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#ff9900',
        //shadowColor: '#eee', //defaultna
        //shadowColor: '#ffb380', //svjetlija nijansa
        shadowOpacity: 1.0, 
        //borderColor: '#ffb380'
       }
    }
    else {
      return {
        backgroundColor: '#e6e6e6',
        borderRadius: 20,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#ff1a1a',
        //shadowColor: '#eee', //defaultna
        //shadowColor: '#ff9999' //svjetlija nijansa
        shadowOpacity: 1.0, 
        //borderColor: '#ff9999'
      }
    }
  }

  const getTextStyle = (quantitiy) => {
    if(quantitiy == 0) {
      return {
        height: 50,
        color: '#ffffff'
      }
    } else {
      return {
        height: 50,
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
            <Card style={getStyle(item.quantitiy)}>
              <Card.Header
                title={ item.title }
                //titleStyle = {{color:'white'}}
                //titleStyle = {getTextStyle(item.quantitiy)}
                thumbStyle={{ width: 30, height: 30 }}
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                extra={ item.price }
                style={{height: 50}}
                //style={getTextStyle(item.quantitiy)}
              />
            </Card>
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
    borderRadius: 20,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: '#eee',
    shadowOpacity: 1.0,  
  },
  refreshBtn: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
    width: 160,
  }
});