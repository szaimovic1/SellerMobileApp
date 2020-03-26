import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header ({ navigation, title, reload }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={30} onPress={openMenu} style={styles.icon} />
            <View>
                <Text style={styles.headerText}>{ title }</Text>
            </View>
            {reload && <MaterialIcons name='refresh' size={30} style={styles.rightIcon} />}
        </View>
        
    )
}

const styles = StyleSheet.create ({
    header: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',      
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
        left: 0,
    },
    rightIcon : {
        position: 'absolute',
        right: 0,
    }
});