import React, { useState }  from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Card, WingBlank, WhiteSpace } from '@ant-design/react-native';
import CardBody from '@ant-design/react-native/lib/card/CardBody';
=======
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import { Card } from 'react-native-paper';
>>>>>>> 54195cc53efc667db63cbf48757ba655f2f62e82

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 54195cc53efc667db63cbf48757ba655f2f62e82
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
<<<<<<< HEAD
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: '#eee',
    shadowOpacity: 1.0,  
=======
>>>>>>> 54195cc53efc667db63cbf48757ba655f2f62e82
  },
  refreshBtn: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
    width: 160,
  }
});