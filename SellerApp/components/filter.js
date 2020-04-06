import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';

export default function Filter({ updateList }) {
    [text, setText] = useState('');
    const [staticProducts, setStaticProducts] = useState([]);

    const onChangeInput = async (value) => { // async/await keywords should be removed if "First solution of filtering a list of products" is used
        await setText(value);
        getSpecificProducts();
    };

    const getSpecificProducts = async () => {
        // First solution of filtering a list of products
        /* var TOKEN = await AsyncStorage.getItem('token');
        fetch("https://cash-register-server-si.herokuapp.com/api/products" + "?search=" + text, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }}).then((res) => res.json()).then((specificProducts) => {
                updateList(specificProducts);
                return specificProducts;
            }).done(); */

        // Second solution of filtering a list of products
        var specificProducts = staticProducts.filter(product => {
            return product.name.includes(text);
        });
        updateList(specificProducts);
    }

    // getAllProducts() and useEffect() should be removed if "First solution of filtering a list of products" is used
    const getAllProducts = async () => {
        var TOKEN = await AsyncStorage.getItem('token');
        fetch("https://cash-register-server-si.herokuapp.com/api/products", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }
        }).then((res) => res.json()).then((products) => {
            setStaticProducts(products);
            return products;
        }).done();
    }

    useEffect(() => {
        getAllProducts();
    }, []);
    
    return (
        <View>
            <TextInput value={text} onChangeText={onChangeInput} placeholder="Enter product's name"  placeholderTextColor = "#f0ffff" style={styles.input} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        fontWeight:'bold',
        color:'#f0ffff'
    },
});