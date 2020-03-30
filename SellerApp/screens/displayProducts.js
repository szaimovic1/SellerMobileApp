import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import { Card } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import Filter from '../components/filter';

export default function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

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
    <View style={styles.container}>
      <Filter updateList={updateList} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getProducts} />
        }>
        {products.map((item) => {
          return (
            <TouchableOpacity key={item.id}>
              <WingBlank size="lg">
                <Card.Title
                  title={item.name}
                  titleStyle={{ color: 'black', paddingTop: 10 }}
                  subtitleStyle={{ color: 'black', paddingBottom: 10 }}
                  left={(props) => {
                    const img = item.imageBase64;
                    return <Image
                      style={{ width: 35, height: 35 }}
                      source={{ uri: img }} />
                  }}

                  right={(props) => <Text>{item.price} KM</Text>}
                  style={styles.card}
                />
              </WingBlank>
              <WhiteSpace size="lg" />
            </TouchableOpacity>

          )
        }
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
  rightIcon: {
    position: 'absolute',
    left: 20,
    marginTop: 20,
    marginBottom: 30,
  }
});