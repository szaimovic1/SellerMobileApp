import React, { useState } from 'react';
import { View, Text, ImageBackground, Keyboard, TextInput, TouchableOpacity, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styles from '../styles/forgotPasswordStyles.js';
import { AsyncStorage } from 'react-native';

export default function ForgotPassword ({navigation}) {
    const { heading, textStyle, userMail, input, loginScreenButton, loginText } = styles;
    const [email, setEmail] = useState("");
    const [safetyCode, setSafetyCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [hidden, setHidden] = useState(true);
    const [hiddenPasswordInput, setHiddenPasswordInput] = useState(true);

    const sendID = async () => {
        //Alert.alert(email);
        const requestBody = { userInfo: email};
        getSecurityCode(requestBody);
        setHidden(!hidden);   
        
    }

    const confirmCode = async () => {
        //Alert.alert("poruka");
        setHiddenPasswordInput(!hiddenPasswordInput);
        //setHidden(!hidden);
    }

    const confirmPassword = async () => {
        Alert.alert(newPassword);
    }

    const getSecurityCode = async (requestBody) => {
        var token = await AsyncStorage.getItem('guestToken');
        console.log(requestBody);
        const xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'https://cash-register-server-si.herokuapp.com/api/reset-token');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.send(JSON.stringify(requestBody));
       
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState !== 4) {
              return;
            }
          
            if (xhr.status === 200) {
              console.log('success', xhr.responseText);
            } else {
              console.log('error');
              console.log(xhr.responseText);
            }
          };
        
    }
    return(
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
        <View>
            <Text style={heading}>Trouble logging in?</Text>
        </View>
        <View>
            <Text style={textStyle}>Enter your email and we'll send you a link to get back into your account.</Text>
        </View>
        <View style={userMail}>
            <TextInput style={input} placeholder="E-mail or username" onChangeText={text => setEmail(text)}></TextInput>
        </View>
        <TouchableOpacity
                    style={loginScreenButton}
                    underlayColor='#fff'
                    onPress={sendID}>
                    <Text style={loginText} >Send Login ID</Text>
        </TouchableOpacity>
        <View style={userMail}>
            { !hidden ? (<TextInput style={input} placeholder="Enter code" onChangeText={text => setSafetyCode(text)}></TextInput>) : null}
        </View>
        <View>
            { !hidden ? (<TouchableOpacity
                    style={loginScreenButton}
                    underlayColor='#fff'
                    onPress={confirmCode}>
                    <Text style={loginText} >Confirm code!</Text>
        </TouchableOpacity>) : null}
        </View>
        <View style={userMail}>
            { !hiddenPasswordInput ? <TextInput style={input} placeholder="Enter new password" onChangeText={text => setNewPassword(text)}></TextInput> : null }
        </View>
        <View>
            { !hiddenPasswordInput ? (<TouchableOpacity
                    style={loginScreenButton}
                    underlayColor='#fff'
                    onPress={confirmPassword}>
                    <Text style={loginText} >Confirm new password!</Text>
        </TouchableOpacity>) : null}
        </View>
        </TouchableWithoutFeedback>
    )
}