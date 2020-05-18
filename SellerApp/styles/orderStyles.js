import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    orderServedView: {
        flexDirection:'row', 
        width:"50%", 
        marginHorizontal: 15,
        backgroundColor:'white', 
        height:47,  
        alignItems:'center', 
        borderRadius:10,
        justifyContent: "center",
    },
    textServed: {
        color:'#237804', 
        fontSize:15, 
        fontWeight:'bold'
    },
});