import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useProductsContext } from '../contexts/productsContext';
import CheckBox from 'react-native-check-box';
import CheckboxFormX from 'react-native-checkbox-form';
import styles from '../styles/filterStyles';

const getFonts = () => {
    return Font.loadAsync({
      'IndieFlower-Regular': require('../assets/fonts/IndieFlower-Regular.ttf')
    });
}

export default function FilterIngredients({ navigation }) {
    const { products, getProducts, mockData, getMockData, setMockData } = useProductsContext();
    const [checked, setChecked] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);    
   var ingredients = [];
    useEffect(() => {
        getProducts();
        getMockData();
    }, []);
    const onSelect = () => { 
        setChecked(!checked);
    }
    var productsWithoutFilter = products.filter(pro => pro.quantity!=0);
    const checkAfterNoResults = () => {
        if(navigation.state.params.noResults) {
            ingredients = navigation.state.params.checkedIngr;
            var temp = mockData;
            temp.forEach(item => {
                ingredients.forEach(ingr => {
                   if(ingr.name == item.name) {
                       item.RNchecked = true;
                   }
                })
            })
        }
    }
    checkAfterNoResults();
    const addItem = (item) => {
        ingredients.push(item);
    }
    const getItems = () => {
        onSelectItem(mockData);
        
        var ingr = ingredients;
        ingr.forEach(object => {
            delete object.RNchecked;
        });
        return ingr;
    }
    const onSelectItem =  (items) => {
        items.forEach(async (object) => {
            if(object.RNchecked && !ingredients.includes(object)) {
                await addItem(object);
            }
            else if (!object.RNchecked) {// ovo znaci da je objekat odznacen
                for (var i = 0; i < ingredients.length; i++) {
                    if (ingredients[i] === object) {
                        ingredients.splice(i, 1);
                        break;
                    }
                }
            }
        });
    }
    const filterProducts = async () => {
        ingredients = getItems();
        var filteredProducts = [];
        if (ingredients != undefined && ingredients.length > 0) {  // odabrali smo neke sastojke
            if (checked) { //ukoliko je oznaceno contains 
                products.forEach(product => {    
                    var containsIngr = false;
                    var numIngr = 0;
                    ingredients.forEach(ingredient => {
                        product.productItems.forEach(item => {
                            if(item.item.name == ingredient.name) numIngr++;
                        });
                        
                    });
                    if(numIngr == ingredients.length) containsIngr = true;
                    if(containsIngr && !filteredProducts.includes(product)) filteredProducts.push(product);
                });
            } else {
                products.forEach(product => {   
                    var containsIngr = false; 
                    var numIngr = 0;
                    ingredients.forEach(ingredient => {
                        containsIngr = false;
                        product.productItems.forEach(item => {
                            if(item.item.name == ingredient.name) containsIngr = true;
                        });
                        if(!containsIngr) numIngr++;
                        
                    });
                    if(product.productItems.length != 0 && numIngr==ingredients.length && !filteredProducts.includes(product)) filteredProducts.push(product);
                });   
            }
            filteredProducts = filteredProducts.filter(pro => pro.quantity != 0);
            navigation.navigate('Offer',  { data: { filteredProducts }, ingr: ingredients});
        } else  {
            navigation.navigate('Offer', { data: { productsWithoutFilter }, ingr: ingredients });
        }
    }

    if (fontsLoaded) {
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <View style={styles.container}>
                    <View style={styles.smallerContainer}>
                        <View style={styles.subContainer}>
                            <CheckBox isChecked={checked} onClick={onSelect} />
                            <Text style={{fontSize: 18, marginLeft: 10, fontFamily: 'IndieFlower-Regular'}}>Contains</Text>
                        </View>
                        <View style={{flex: 4, width: '100%', alignItems: 'center'}}>
                            <CheckboxFormX
                                style={{ width: 350 - 30 }}
                                dataSource={mockData}
                                itemShowKey="name"
                                itemCheckedKey="RNchecked"
                                iconSize={36}
                                iconColor='grey'
                                formHorizontal={false}
                                labelHorizontal={true}
                                textStyle={{fontSize: 20, color: 'black', width: 120, marginLeft: 10, marginVertical: 5,  fontFamily: 'IndieFlower-Regular', }}
                                onChecked={(items) => onSelectItem(items)}
                            />
                        </View>
                    </View>
                    <View style={styles.filterBtnView}>
                        <TouchableOpacity onPress={filterProducts} style={styles.finishBtn}>
                            <Text style={styles.finishText}>FILTER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Offer', { data: { productsWithoutFilter }, ingr: null })} style={styles.finishBtn}>
                            <Text style={styles.finishText}>SHOW ALL PRODUCTS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    } else {
        return (
            <AppLoading
              startAsync={getFonts}
              onFinish={() => setFontsLoaded(true)}
            />
        );
    }
}