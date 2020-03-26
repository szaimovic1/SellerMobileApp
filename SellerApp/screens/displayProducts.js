import React, { useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import { Card } from 'react-native-paper';

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
            <Card.Title
              title={item.title}
              titleStyle={{color:'black', paddingTop: 10}}
              subtitle="Card Subtitle"
              subtitleStyle={{color:'black', paddingBottom: 10}}
              left={(props) => <Image 
                style={{width: 35, height: 35}}
                source={{ uri: 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg',}}></Image>}
              right={(props) => <Text>{item.price}</Text>}
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