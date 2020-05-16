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
    const { products, getProducts, mockData, getMockData, getItems } = useProductsContext();
    const [checked, setChecked] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [ingredients, setIngredients] = useState([]);    
    
    useEffect(() => {
        getProducts();
        getMockData();
        getItems();
    }, []);

    const onSelect = () => setChecked(!checked);
    var productsWithoutFilter = products.filter(pro => pro.quantity!=0);
    //console.log('velicina mock ' + mockData.length);
    const onSelectItem = (items) => {
        items.map(object => {
            //sada ingredients moze biti niz objekata koji su sastojci i  umjesto provjere labele mozemo citav objekaz
            //provjeravati da li je sadrzan?
            if(object.RNchecked && !ingredients.includes(object.label)) setIngredients(oldIngredients => [...oldIngredients, object.label]);
            else if (!object.RNchecked) {// ovo znaci da je objekat odznacen
                for (var i = 0; i < ingredients.length; i++) {
                    if (ingredients[i] === object.label) {
                        ingredients.splice(i, 1);
                        break;
                    }
                }
            }
           /* if(object.RNchecked && !ingredients.includes(object)) setIngredients(oldIngredients => [...oldIngredients, object]);
            else if (!object.RNchecked) {// ovo znaci da je objekat odznacen
                for (var i = 0; i < ingredients.length; i++) {
                    if (ingredients[i] === object) {
                        ingredients.splice(i, 1);
                        break;
                    }
                }
            }*/
        });
    }

    const filterProducts = async () => {
        var filteredProducts = [];
        if (ingredients != undefined && ingredients.length > 0) {  // odabrali smo neke sastojke
            if (checked) { //ukoliko je oznaceno contains
                products.map(product => {
                /*    console.log('product ' + product.name);
                    if(product.itemType != null) {
                        console.log(product.itemType);
                        console.log(product.productItems);
                    }*/
                    //ovdje cemo provjeravati da li ovaj product u nizu productItems sadrzi
                    //sve oznacene sastojke
                    var containsIngr = true;
                    ingredients.map(ingredient => {
                        
                       // if(!product.productItems.includes(ingredient)) containsIngr = false;
                        
                        var index = product.description.indexOf('Ingredients');
                        var descIngredients = product.description.substring(index+12, product.description.length-1);
                        if (!descIngredients.toLowerCase().includes(ingredient.toLowerCase())) containsIngr = false;
                    });
                    if (containsIngr) filteredProducts.push(product);
                })
            } else {
                products.map(product => {
                    //ovdje cemo provjeravati da li ovaj product u nizu productItems ne sadrzi
                    //sve oznacene sastojke
                    var notContains = true;
                    ingredients.map(ingredient => {
                        
                       // if(product.productItems.includes(ingredient)) notContains = false;
                        
                        var index = product.description.indexOf('Ingredients');
                        var descIngredients = product.description.substring(index+12, product.description.length-1);
                        if (descIngredients.toLowerCase().includes(ingredient.toLowerCase())) notContains = false;
                    });
                    if (notContains) filteredProducts.push(product);
                })
            }
            filteredProducts = filteredProducts.filter(pro => pro.quantity!=0);
            navigation.navigate('Offer',  { data: { filteredProducts }});
        } else  {
            navigation.navigate('Offer', { data: { productsWithoutFilter } });
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
                                itemShowKey="label"
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
                        <TouchableOpacity onPress={() => navigation.navigate('Offer', { data: { productsWithoutFilter } })} style={styles.finishBtn}>
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