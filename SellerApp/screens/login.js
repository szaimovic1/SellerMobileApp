import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert, Image, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../styles/loginStyles.js';
import {AsyncStorage} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
export default function Login ({navigation}) {
    const { heading, input, parent, employeeImage, userPass, loginScreenButton, loginText } = styles;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const ACCESS_TOKEN='access_token';
    
    setItemStorage = async(key, value) => {
        try{
            await AsyncStorage.setItem(key, value);
            console.log(value);
        }
        catch(err){
            console.log("greska u store");
        }
    }
 
    checkLogin = async () => {
        // const location = window.location.hostname;
         const settings = {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
             },

             body: JSON.stringify({

                 username: username,
                 password: password,
             })
         };
         try {
             const fetchResponse = await fetch('https://cash-register-server-si.herokuapp.com/api/login', settings);
             const data = await fetchResponse.json();

             if(fetchResponse.ok){ 
                 setItemStorage('token', data.token);
                 
                 navigation.navigate('DisplayProducts')
             }
             else{
                 Alert.alert ('Error', 'Bad credentials!',[{
                     text: 'Okay'
                  }])
             }
             return data;
         } catch (e) {
            Alert.alert ('Error', 'Server timeout!',[{
             text: 'Okay'
          }])
             return e;
         }    
     
     } 

    


 
    return (
        <ImageBackground source={require('../images/background2.png')} style={parent}>
        <Image source={require('../images/employee.png')} style={employeeImage}/>
            <Text style={heading}>Login</Text>
            <View style={userPass}>
                <FontAwesome name='user' size = {30} color='#fff'></FontAwesome>
                <TextInput style={input} placeholder="Username" onChangeText={text => setUsername(text)}/>
            </View>
            <View style={userPass}>
                <FontAwesome name='lock' size = {30} color='#fff'></FontAwesome>
                <TextInput style={input} secureTextEntry={true} placeholder="Password" onChangeText={text => setPassword(text)} />
            </View>
            <TouchableOpacity
                style={loginScreenButton}
                onPress={checkLogin}
                underlayColor='#fff'>
                <Text style={loginText}>Submit</Text>
            </TouchableOpacity>
    </ImageBackground>
    )
}
