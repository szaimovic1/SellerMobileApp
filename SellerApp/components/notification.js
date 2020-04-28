import { useState, useEffect } from 'react';
import { AsyncStorage, Vibration } from 'react-native';
import { Notifications } from 'expo';

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        Notifications.addListener(handlePushNotification);
    }, []);

    useEffect(() => {
        notifyTheWaiter();
    }, [notifications]);

    useEffect(() => {
        sendPushNotification();
    }, [notificationMessage]);

    const handlePushNotification = notification => {
        Vibration.vibrate();

        //ovdje se moze raditi bilo sta sa vracenom push notifikacijom
        //console.log(notification.data);
    };

    const sendPushNotification = async () => {
        if (!notificationMessage.includes("Guest is calling you to the table number")) return;

        const expoPushToken = await AsyncStorage.getItem('expoPushToken');

        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'WARNING!',
            body: notificationMessage,
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

    const notifyTheWaiter = async () => {
        if (typeof notifications === 'undefined' || notifications == null || notifications.length === 0) return;

        notifications.map(notification => {
            let message = notification.message;
            setNotificationMessage(message);
        });

        await AsyncStorage.setItem('lastNotificationID', notifications[notifications.length - 1].id.toString());
    }

    setTimeout(async () => {
        var TOKEN = await AsyncStorage.getItem('token');
        var lastNotificationID = await AsyncStorage.getItem('lastNotificationID');

        fetch('https://cash-register-server-si.herokuapp.com/api/notifications/' + lastNotificationID, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }
        }).then((res) => res.json()).then(async (res) => {
            setNotifications(res);
        }).done();
    }, 30000);

    return (
        null
    );
}
