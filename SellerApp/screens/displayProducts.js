import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Card, WingBlank, WhiteSpace } from '@ant-design/react-native';

export default function DisplayProducts() {  
    /* Privremeni testni podaci */
  const [products, setProducts] = useState ([
    { title: 'Coca Cola', price: '3.50KM', key: '1' },
    { title: 'Limunada', price: '4.00KM', key: '2' },
    { title: 'Čaj', price: '4.00KM', key: '3' },
    { title: 'Kafa', price: '4.00KM', key: '4' },
    { title: 'Topla čokolada', price: '4.00KM', key: '6' }
  ]);

  return (
    <View style={styles.container}>
      <ScrollView>
      {products.map((item) => {
        return (
          <TouchableOpacity>
          <WingBlank size="lg">
            <Card style={styles.card}>
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