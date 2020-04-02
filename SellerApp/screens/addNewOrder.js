import React from 'react'
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import styles from '../styles/productStyles';
import { Card,  TextInput  } from 'react-native-paper';
import { saveNewOrder } from '../functions/storage';

export default function AddNewOrder ({ navigation }) {
    const param = navigation.getParam('data');
    const order = param.newOrder; // objekat koji sadrzi kao atribute: products-niz proizvoda,tableNr i served
    order.served = false; // ako se ne unese napomena znaci da nije usluzeno
    const isServed = (orderNote) => {
        if((orderNote.includes('served') || orderNote.includes('usluzena') || orderNote.includes('uslužena') || orderNote.includes('usluženo') || orderNote.includes('usluzeno')) && 
        !(orderNote.includes('not served') || orderNote.includes('neusluzena') || orderNote.includes('neuslužena') || orderNote.includes('neusluženo') || orderNote.includes('neusluzeno'))) {
            return true;
        }
        return false;
    }
    const checkTableNumber = (note) => {
        var orderNote = note;
        var words = orderNote.replace( /\n/g, " " ).split(' ');
        words.forEach(word => {
            if(!isNaN(word)) {
                order.tableNr = Number(word);
            }
        });
    }
    const checkTableNumberAndServed = (note) => {  
        var orderNote = note;
        orderNote = orderNote.toLowerCase();
        if(isServed(orderNote)) {
            order.served = true;
        }
        else {
            order.served = false;
        }
        checkTableNumber(note);
    } 
    return (
        <ImageBackground source={require('../images/background2.png')} 
        style={styles.container}>
            <View style={styles.btnContainer}>
                <View style={{flex: 1}}>
                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={ () => {                    
                        saveNewOrder(navigation.state.params.data.newOrder); // spašava u AsyncStorage
                        navigation.navigate('DisplayProducts');
                    }}
                    underlayColor='#fff'>
                    <Text style={styles.sumbitText}>Save order</Text>
                </TouchableOpacity></View>
                <View style={{flex: 1}}>
                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={ () => {                    
                        navigation.navigate('DisplayProducts');
                    }}
                    underlayColor='#fff'>
                    <Text style={styles.sumbitText}>Cancel</Text>
                </TouchableOpacity></View>
            </View>
            <TextInput on multiline placeholder='Note' style={styles.input} onChangeText={text => checkTableNumberAndServed(text)}/>
            <ScrollView>
                {navigation.state.params.data.newOrder.products.map(( item ) => {
                    return (
                        <WingBlank size="lg" key={item.id}>
                        <Card.Title            
                            title={item.name}
                            titleStyle={{paddingTop: 10, color: '#000000'}}
                            left={(props) => {
                                const img = item.imageBase64;
                                return <Image {...props} 
                                    style={{width: 35, height: 35, opacity: 1}}
                                    source={{ uri: img }} /> 
                            }}
                            right={(props) => (
                            <View {...props} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{
                                    marginRight: 30, 
                                    paddingHorizontal: 10, 
                                    paddingVertical: 10,
                                    backgroundColor: '#bae7ff',
                                    borderRadius: 10,
                                    borderWidth: 0.2,
                                    borderColor: '#bae7ff'
                                }}>
                                <Text>{item.times}</Text>
                                </View>                    
                                <Text style={{ color: '#000000' }}>{item.price} KM</Text>
                            </View>
                            )}
                            style={styles.card}
                        />
                        </WingBlank>
                    )
                })}
            
                <WhiteSpace size="lg" />
            </ScrollView>
        </ImageBackground>
    );
}