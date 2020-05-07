import { StyleSheet } from 'react-native';
import { getFonts } from '../functions/async';

getFonts();

export default StyleSheet.create( {
    container: {
        flex: 1, 
        backgroundColor: '#F5F5F5', 
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    finishBtn: {
        padding: 10,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '90%',
        height: 50,
        marginTop: 10,
    },
    finishText: {
        color: 'white', 
        fontWeight: 'bold',
        fontFamily: 'IndieFlower-Regular',
        fontSize: 20,
    },
    textInput: {
        height: 50,
        width: '90%',
        marginBottom: 10,
        fontFamily: 'IndieFlower-Regular',
        fontWeight: 'normal',
    },
    subContainer: {
        flexDirection: 'row',
        padding: 10,
        marginTop: 15,
    },
    filterBtnView: {
        flex: 1, 
        width: '100%', 
        alignItems: 'center', 
        marginBottom: 20, 
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
    },
    smallerContainer: {
        flex: 3, 
        backgroundColor: '#E8E8E8', 
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%', 
        borderRadius: 10, 
        marginVertical: 10, 
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
    }

});