// ovo je početni ekran čitave aplikacije
import React, {useEffect, useState} from 'react';
import { View, Text, ImageBackground, StyleSheet, AsyncStorage, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getFonts } from '../functions/async';
import { AppLoading } from 'expo';

export default function Start ({ navigation }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    //ULOGOVANJE GUESTA 
    setItemStorage = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            console.log(value);
        }
        catch (err) {
            console.log("greska u store");
        }
    }
    const logIn = async () => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                username: 'guest',
                password: 'password',
            })
        };
        try {
            const fetchResponse = await fetch('https://cash-register-server-si.herokuapp.com/api/login', settings);
            const data = await fetchResponse.json();

            if (fetchResponse.ok) {
                setItemStorage('guestToken', data.token);
            }
            else {
                Alert.alert('Error', 'Bad credentials!', [{
                    text: 'Okay'
                }])
            }
            return data;
        } catch (e) {
            Alert.alert('Error', 'Server timeout!', [{
                text: 'Okay'
            }])
            return e;
        }
    }
    useEffect(() => {
        
    }, [])
    if (fontsLoaded) {
    return (        
            <View style={styles.container}>
                <View style={styles.logInBtn}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('LogIn');
                        }}>
                        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Log in</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'black', fontFamily: 'courgette-regular', fontSize: 60}}>The shopping that will make you happy!</Text>
                </View>
                
                <View style={{flex: 1, width: '80%'}}>
                
                <View style={styles.offerBtn}>
                    <TouchableOpacity
                        onPress={() => {
                            logIn();
                            navigation.navigate('Offer');
                        }}>
                        <Text style={{color: 'black', fontWeight: 'bold',}}>CHECK OUT THE OFFER ---></Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
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

const styles = StyleSheet.create( {
        container: {
            flex: 1,
            backgroundColor: '#E8E8E8',
            alignItems: 'center',
            justifyContent: 'center',
        },
        logInBtn: {
            width: '40%', 
            height: 50, 
            padding: 5, 
            justifyContent: 'center', 
            alignItems: 'center',
            alignSelf: 'flex-end',
            borderRadius:25,
            marginTop: 50,
        },
        offerBtn: {
            width:"100%",
            backgroundColor:"#fb5b5a",
            borderRadius:25,
            height:60,
            alignItems:"center",
            justifyContent:"center",
            alignSelf: 'center',            
            marginTop:40,
            marginBottom:10
        },
        
    }
);