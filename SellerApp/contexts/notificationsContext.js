import React, { useState, createContext, useContext } from 'react';
import { AsyncStorage } from 'react-native';

export const NotificationsContext = createContext();

export const NotificationsContextProvider = (props) => {
    const { children } = props;

    const [notificationMessage, setNotificationMessage] = useState('');
    

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

    const subscribeToServer = async (stompContext, StompEventTypes) => {
        const client = await stompContext.newStompClient('https://cash-register-server-si.herokuapp.com/ws');
        console.log("Klijent ", client);
        let TOKEN = await AsyncStorage.getItem('token');
        stompContext.addStompEventListener(StompEventTypes.Connect, async () => {
          console.log("Connected");
          await fetch("https://cash-register-server-si.herokuapp.com/ws", {
            method: "GET",
            headers: {
              'Authorization': 'Bearer ' + TOKEN
            }
          });
          /*const { data } = await axios.get(`${BASE_URL}api/auth/user/me`, {
            headers: {
              authorization: 'Bearer ${TOKEN}',
            },
          });*/
          stompContext
            .getStompClient()
            .subscribe('/topic/notifications', (msg) => {
              console.log("subscribe");
              // if (lastNotificationId !== JSON.parse(msg.body).notificationId) {
                handlePushNotification({ data: JSON.parse(msg.body) });
              // }
            });
        });
    
        stompContext.addStompEventListener(StompEventTypes.Disconnect, () => {
          console.log("Disconnected");
        });
    
        stompContext.addStompEventListener(StompEventTypes.WebSocketClose, () => {
          console.log("Disconnected (not graceful)");
        });
    };

    const handlePushNotification = notification => {
        //ovdje se moze raditi bilo sta sa dobijenom push notifikacijom

        //console.log(notification.data); // podaci koji su proslijedjeni uz notifikaciju
        console.log("DObijena notifikacija ", notification);
        Vibration.vibrate();
    };

    const notificationsData = {
        sendPushNotification,
        subscribeToServer,

    }

    return <NotificationsContext.Provider value={notificationsData}>{ children }</NotificationsContext.Provider>;

}

export const { Consumer } = NotificationsContext;

export const useNotificationsContext = () => useContext(NotificationsContext);