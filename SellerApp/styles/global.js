import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    header: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',      
        alignItems: 'center',
        justifyContent: 'space-evenly',
<<<<<<< HEAD
        width: Dimensions.get('window').width-35,
=======
        alignContent: 'space-between'
>>>>>>> 59cbccc27dcae373d75128c142a388df52c76c09
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
        left: 0,
        color: 'white'
    },
    
})
