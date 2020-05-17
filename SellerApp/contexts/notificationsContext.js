import React, { createContext, useContext, useState, useEffect } from 'react';
import { AsyncStorage, Vibration } from 'react-native';
import { useOrdersContext } from './ordersContext';

export const NotificationsContext = createContext();

export const NotificationsContextProvider = (props) => {
    const { children } = props;    

    const [topicId, setTopicId] = useState(0);
    const [notificationMsg, setNotificationMsg] = useState('');
    const { getOrdersServer } = useOrdersContext();

    useEffect(() => {
        handlePushNotification();
    }, [notificationMsg])

    const sendPushNotification = async () => {
        if (!(notificationMsg.includes("Guest is calling you to the ") || notificationMsg.includes("A guest has placed an order"))) return;
        getOrdersServer();
        const expoPushToken = await AsyncStorage.getItem('expoPushToken');

        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'WARNING!',
            body: notificationMsg,
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
        }).then((res) => {
            console.log("poslano na expo")
            Vibration.vibrate();
        });
        setNotificationMsg('');
    }

    const subscribeToServer = async (stompContext, StompEventTypes) => {
        const client = await stompContext.newStompClient('https://cash-register-server-si.herokuapp.com/ws');
        stompContext.addStompEventListener(StompEventTypes.Connect, async () => {
          console.log("Connected");
          if(stompContext.getStompClient() === undefined)
            await stompContext.newStompClient('https://cash-register-server-si.herokuapp.com/ws');
          setTopicId(stompContext
            .getStompClient()
            .subscribe('/topic/notifications', (msg) => {
                const data = JSON.parse(msg.body);
                setNotificationMsg(data.message);
            })
          );
          setTopicId(stompContext
            .getStompClient()
            .subscribe('/topic/guest_order', (msg) => {
              setNotificationMsg(msg.body);
            })
          );

        });
    
        stompContext.addStompEventListener(StompEventTypes.Disconnect, () => {
          console.log("Disconnected");
        });
    
        stompContext.addStompEventListener(StompEventTypes.WebSocketClose, () => {
          console.log("Disconnected (not graceful)");
        });
    };

    const handlePushNotification = () => {
        sendPushNotification();
    };

    const notificationsData = {
        sendPushNotification,
        subscribeToServer,
        topicId,
    }

    return <NotificationsContext.Provider value={notificationsData}>{ children }</NotificationsContext.Provider>;

}

export const { Consumer } = NotificationsContext;

export const useNotificationsContext = () => useContext(NotificationsContext);