import React, { useState, createContext, useContext } from 'react';
import { AsyncStorage } from 'react-native';

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
    const { children } = props;

    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [mockData, setMockData] = useState([]);
    const [items, setItems] = useState([]);
    const getProducts = async () => {
        setRefreshing(true);
        var TOKEN = await AsyncStorage.getItem('token');
        if (TOKEN == null) TOKEN = await AsyncStorage.getItem('guestToken');
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
    const getItems = async () => {
        var TOKEN = await AsyncStorage.getItem('token');
        if (TOKEN == null) TOKEN = await AsyncStorage.getItem('guestToken');
        fetch("https://cash-register-server-si.herokuapp.com/api/items", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + TOKEN
          }
        })
          .then((response) => response.json())
          .then((itemsServer) => {
              console.log(itemsServer);
            setItems(itemsServer);
            return itemsServer ;
          })
          .done();
    }
    const getMockData = async() => {
        /*var TOKEN = await AsyncStorage.getItem('token');
        if (TOKEN == null) TOKEN = await AsyncStorage.getItem('guestToken');
        fetch("https://cash-register-server-si.herokuapp.com/api/items", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + TOKEN
          }
        })
          .then((response) => response.json())
          .then((items) => {
            console.log(items);
            setMockData(items);
            return items;
          })
          .done();*/
        /*getItems();
        items.forEach(function(item) {
            item.label = item.name.toLowerCase();
        })*/
      //ovdje ce ici ruta koja ce fetch sve items i spasiti u mockData tako da se u svaki objekat doda
      //atribut label: naziv.toLowerCase() 
      //to de moze sa lista.forEach(function(item) {item.label=item.name.toLowerCase()}) ili
      //probati da u CheckboxFormX prop itemShowKey="name" ili kako se vec bude zvao naziv
      var localData = [];

      if (products != undefined && products.length > 0) {
          var counter = 0;
          for (var i = 0; i < products.length; i++) {
              var index = products[i].description.indexOf('(Ingredients:');
              if (index != -1) {
                  var descIngredients = products[i].description.substring(index+14, products[i].description.length-1);
                  var array = descIngredients.split(', ');
                  for (var j = 0; j < array.length; j++) {
                      var ingredientExists = false;
                      if (counter < 20) { // ako jos uvijek nemamo 20 sastojaka, poredimo i ovaj trenutni
                          for (var k = 0; k < localData.length; k++) {
                              if (localData[k] != undefined && localData[k].label.trim().toLowerCase() === array[j].trim().toLowerCase()) {
                                  ingredientExists = true;
                                  break;
                              }
                          }        
                          if (!ingredientExists) {
                              counter++;
                              localData.push({
                                  'label': array[j].toLowerCase()
                              });
                          }
                      } else if (counter >= 20) {
                          console.log("Setovano");
                          setMockData(localData);
                          return;
                      }
                  }
              }
              
          }
      }
  }

    const productsData = {
        products, 
        getProducts,
        setProducts,
        refreshing,
        mockData,
        getMockData,
        getItems
    }

    return <ProductsContext.Provider value={productsData}>{ children }</ProductsContext.Provider>;

}

export const { Consumer } = ProductsContext;

export const useProductsContext = () => useContext(ProductsContext);