import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Card, WingBlank, WhiteSpace } from '@ant-design/react-native';

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
        borderRadius: 20,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#ff9900',
        shadowOpacity: 1.0, 
        //borderColor: '#ff9900',
       }
    }
    else {
      return {
        borderRadius: 20,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: '#ff1a1a',
        shadowOpacity: 1.0, 
        //borderColor: '#ff1a1a'
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
                thumbStyle={{ width: 30, height: 30 }}
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                extra={ item.price }
                style={{height: 50}}
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