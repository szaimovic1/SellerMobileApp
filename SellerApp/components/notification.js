import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from "react-native-flash-message";

export default function Notification() {
    const [orders, setOrders] = useState([]);
    const [notifications, setNotifications] = useState([]);

    setTimeout(async () => {
        var TOKEN = await AsyncStorage.getItem('token');
        var lastNotificationID = await AsyncStorage.getItem('lastNotificationID');
        fetch('https://cash-register-server-si.herokuapp.com/api/notifications/' + lastNotificationID, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            }
        }).then((res) => res.json()).then(async (res) => {
            setNotifications(res); // svakih 30sec se azuriraju notifikacije
            let ord = await AsyncStorage.getItem('orders');
            ord = JSON.parse(ord);
            setOrders(ord); // svakih 30sec se azuriraju narudzbe jer se moze desit da je nova kreirana u medjuvremenu
        }).done();
    }, 30000);

    const showNotificationMessage = (message, description, duration) => {
        showMessage({
            message: message,
            type: "success",
            description: description,
            duration: duration,
            backgroundColor: "red",
            style: {
                fontWeight: "bold",
                fontSize: 50,
            },
            hideOnPress: true,
            animated: true
        });
    }

    const notifyTheWaiter = async () => {
        if (notifications.length === 0 || typeof notifications === 'undefined' || notifications == null) return;

        notifications.map(notification => {
            let message = notification.message;
            if (message.includes("Guest is calling you to the table number")) {
                let tableNumber = message.match(/\d+/g).map(Number)[0];
                if (typeof orders != 'undefined' && orders != null) {
                    orders.map(o => {
                        if (o.tableNr == tableNumber) {
                            /* Alert.alert('WARNING', message, [{
                                text: 'OK'
                            }]); */

                            showNotificationMessage("WARNING", message, 'infinite');
                        }
                    });
                }
            }
        });

        await AsyncStorage.setItem('lastNotificationID', notifications[notifications.length - 1].id.toString());
    }

    useEffect(() => {
        notifyTheWaiter();
    }, [notifications]);

    return (
        <FlashMessage position="top" />
    );
}
