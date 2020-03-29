import React from 'react'
import { StyleSheet, Text, View, Dimensions} from 'react-native';
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
        height: '100%',
        flexDirection: 'row',      
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: "white",
        width: Dimensions.get('window').width-35,
        padding: 5,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
        margin: 0,
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