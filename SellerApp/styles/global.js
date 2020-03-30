import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    header: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',      
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
        marginLeft: 120
    },
    icon: {
        position: 'absolute',
        left: 0,
        color: 'white'
    }
})
