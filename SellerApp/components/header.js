import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from '../styles/global.js';

export default function Header ({ navigation, title }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={30} onPress={openMenu} style={styles.icon} />
            <View>
                <Text style={styles.headerText}>{ title }</Text>
            </View>
        </View>
    )
}
