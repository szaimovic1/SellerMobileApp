import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    header: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',      
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: Dimensions.get('window').width-35,
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1
    },
    icon: {
        position: 'absolute',
        left: 0,
        color: 'white'
    },
    rightIcon : {
        position: 'absolute',
        right: 0,
        color: 'white'
    }
})