import React from 'react'
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { WingBlank, WhiteSpace } from '@ant-design/react-native';
import styles from '../styles/productStyles';
import { Card } from 'react-native-paper';
import { saveNewOrder } from '../functions/storage';

export default function AddNewOrder ({ navigation }) {
    const param = navigation.getParam('data');
    const order = param.newOrder; // objekat koji sadrzi kao atribute: products-niz proizvoda,tableNr i served
    const getTableNumber = (note) => {
        var words = note.split('');
        words.forEach(word => {
            if(!isNaN(word)) {
                //console.log('ima broj stola ' + word);
                return Number(word);
            }
        });
        return 0;
    }
    const checkTableNumberAndServed = (note) => {
        note = note.toLowerCase();
        //trazimo rijec koja naznacava da je narudzba usluzena
        if(note.includes('served') || note.includes('usluzena') || note.includes('uslužena') || note.includes(usluzeno) || note.includes(usluženo)) {
            order.served = true;
        }
        else {
            order.served = false;
        }

        note.tableNr = getTableNumber(note);
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
            <TextInput multiline placeholder='Note' style={styles.input} onChangeText={text => checkTableNumberAndServed(text)}/>
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