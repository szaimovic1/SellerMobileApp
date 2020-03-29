import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert } from 'react-native';
import styles from '../styles/loginStyles.js';
 
export default function Login ({navigation}) {
    const { heading, input, parent } = styles;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
 
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
            console.log(data);
            console.log(data);
            navigation.navigate('DisplayProducts')
            //navigation.push('DisplayProducts')
            return data;
        } catch (e) {
           //ispisat "Nešto nije u redu!";
           Alert.alert ('Error', 'Nesto nije u redu!',[{
            text: 'Okay'
         }])
            return e;
        }    
    
    }
 
    return (
        <View style={parent}>
                <Text style={heading}>Login into the application</Text>
                <TextInput style={input} placeholder="Username" onChangeText={text => setUsername(text)}/>
                <TextInput style={input} secureTextEntry={true} placeholder="Password" onChangeText={text => setPassword(text)} />
 
 
                <Button title={"Login"} onPress={checkLogin} />
            </View>
    )
}
