import React, { useState, useEffect } from 'react'
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
    const { products, getProducts } = useProductsContext();
    const [checked, setChecked] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [mockData, setMockData] = useState([]);

    setMockDataAsync = (state) => {
        return new Promise((resolve) => {
          setMockData(state, resolve)
        });
    };

    const getIngredients = async () => {
        setMockData([]);
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
                            console.log(localData.length);
                            for (var k = 0; k < localData.length; k++) {
                               // console.log(array[j].trim().toLowerCase());
                                if (localData[k] != undefined && localData[k].label.trim().toLowerCase() === array[j].trim().toLowerCase()) {
                                    ingredientExists = true;
                                    break;
                                }
                            }        
                            if (!ingredientExists) {
                                counter++;
                                console.log("counter uvecan", counter);
                                localData.push({
                                    'label': array[j].toLowerCase()
                                });
                            }
                        } else if (counter >= 20) return;
                    }
                }
                
            }
          /*  products.map(product => {
                var index = product.description.indexOf('(Ingredients:');
                var descIngredients = product.description.substring(index+12, product.description.length-1);
                console.log(descIngredients);
                var array = descIngredients.split(', ');
                array.map(ingredient => {
                    var newObject = {
                        'label': ingredient.toLowerCase()
                    };
                    if (i < 20 && !mockData.includes(newObject)) {
                        i++;
                        setMockData(oldData => [...oldData, newObject]);
                    } 
                        
                });

            })*/
            await setMockDataAsync(localData);
        }
        
    }


    useEffect(() => {
        getProducts();
        getIngredients();
    }, []);

    const onSelect = () => setChecked(!checked);

    const onSelectItem = (items) => {
        items.map(object => {
            if(object.RNchecked && !ingredients.includes(object.label)) setIngredients(oldIngredients => [...oldIngredients, object.label]);
        })
    }

    const filterProducts = async () => {
        var filteredProducts = [];
        if (ingredients != undefined && ingredients.length > 0) {  // odabrali smo neke sastojke
            if (checked) {
                products.map(product => {
                    var containsIngr = true;
                    ingredients.map(ingredient => {
                        var index = product.description.indexOf('Ingredients');
                        var descIngredients = product.description.substring(index+12, product.description.length-1);
                        if (!descIngredients.toLowerCase().includes(ingredient.toLowerCase())) containsIngr = false;
                    });
                    if (containsIngr) filteredProducts.push(product);
                })
            } else {
                products.map(product => {
                    var notContains = true;
                    ingredients.map(ingredient => {
                        var index = product.description.indexOf('Ingredients');
                        var descIngredients = product.description.substring(index+12, product.description.length-1);
                        if (descIngredients.toLowerCase().includes(inputIngredient.toLowerCase())) notContains = false;
                    });
                    if (notContains) filteredProducts.push(product);
                })
            }
            navigation.navigate('Offer',  { data: { filteredProducts }});
        } else  navigation.navigate('Offer', { data: { products } });
       
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
                                itemShowKey="label"
                                itemCheckedKey="RNchecked"
                                iconSize={26}
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
                        <TouchableOpacity onPress={() => navigation.navigate('Offer', { data: { products } })} style={styles.finishBtn}>
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