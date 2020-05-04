import React, { useState, createContext, useContext, useEffect } from 'react';
import { AsyncStorage, Vibration } from 'react-native';
import { Notifications } from 'expo';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

let stompClient = null;

export const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const { children } = props;

    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        Notifications.addListener(handlePushNotification);
    }, []);

    useEffect(() => {
        sendPushNotification();
    }, [notificationMessage]);

    const openSocketConnection = () => {
        const socket = new SockJS('http://stomp-test.herokuapp.com/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, () => { // prvi argument predstavlja headere, drugi argument je onConnected callback funkcija, treci argument je onError callback funkcija
            stompClient.subscribe(`/topic/news`, msg => {
                const data = JSON.parse(msg.body);
                setNotificationMessage(data.message);
            });
        }, err => console.log("ERROR!"));

        return () => stompClient.disconnect();
    }

    const closeSocketConnection = () => {
        if(stompClient != null) { console.log("OK1!");
            stompClient.disconnect();
        }
        else console.log("OK2!");
    }

    const handlePushNotification = notification => {
        //ovdje se moze raditi bilo sta sa dobijenom push notifikacijom

        //console.log(notification.data); // podaci koji su proslijedjeni uz notifikaciju

        Vibration.vibrate();
    };

    const sendPushNotification = async () => {
        if (!notificationMessage.includes("Guest is calling you to the table number")) return;

        const expoPushToken = await AsyncStorage.getItem('expoPushToken');

        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'WARNING!',
            body: notificationMessage,
            // data: { data: 'nesto' } // slanje podataka uz notifikaciju
            _displayInForeground: true,
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        setNotificationMessage('');
    }

    const notificationData = {
        openSocketConnection,
        closeSocketConnection
    }

    return <NotificationContext.Provider value={notificationData}>{ children }</NotificationContext.Provider>;
}

export const { Consumer } = NotificationContext;

export const useNotificationContext = () => useContext(NotificationContext);