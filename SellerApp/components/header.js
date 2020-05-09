import React from 'react'
import { Text, View, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { logOut } from '../functions/storage';
import styles from '../styles/global.js';


export default function Header({ navigation, title, stompContext }) {



    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={30} onPress={openMenu} style={styles.icon} />
            <View>
                <Text style={styles.headerText}>{ title }</Text>
            </View>
            <MaterialCommunityIcons name="logout" 
                                    size={27} 
                                    style={styles.icon2}
                                    onPress={() => {Alert.alert('Log out',
                                                                'Do you want to logout?',
                                                                [
                                                                {text: 'Cancel', onPress: () => {return null}},
                                                                {text: 'Confirm', onPress: () => {  
                                                                                                    navigation.navigate('Start', {fos: "ok"}) } }
                                                                ],
                                                                { cancelable: false })
                                                    }
                                            }  
            />
        </View>
        
    )

}



