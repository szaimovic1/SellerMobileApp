import { StyleSheet } from 'react-native';

export default StyleSheet.create( {
    container: {
        flex: 1, 
        backgroundColor: 'white', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        marginTop: 30,
        color: "#404040", 
        fontSize: 30, 
    },
    finishBtn: {
        padding: 10,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 100,
    },
    finishText: {
        color: 'white', 
        fontWeight: 'bold',
    }

});