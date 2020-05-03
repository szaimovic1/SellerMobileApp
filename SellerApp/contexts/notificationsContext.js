import React, { createContext, useContext } from 'react';
import { AsyncStorage, Vibration } from 'react-native';

export const NotificationsContext = createContext();

export const NotificationsContextProvider = (props) => {
    const { children } = props;    

    const sendPushNotification = async (notificationMsg) => {
        console.log("PORUKA GLASI ", notificationMsg);
        if (!notificationMsg.includes("Guest is calling you to the table number")) {
            console.log("Izlazi iz funkcije");
            return;
        }
        
        const expoPushToken = await AsyncStorage.getItem('expoPushToken');

        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'WARNING!',
            body: notificationMsg,
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
        }).then((res) => console.log("poslano na expo"));
    }

    const subscribeToServer = async (stompContext, StompEventTypes) => {
        const client = await stompContext.newStompClient('https://cash-register-server-si.herokuapp.com/ws');
        console.log("Klijent ", client);
        let TOKEN = await AsyncStorage.getItem('token');
        stompContext.addStompEventListener(StompEventTypes.Connect, async () => {
          console.log("Connected");
          stompContext
            .getStompClient()
            .subscribe('/topic/notifications', (msg) => {
              console.log("subscribeano");
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
        sendPushNotification(notification.data.message);
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