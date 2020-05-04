import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 50,
        marginTop: 20,
        color: 'white'
    }, 
    textStyle:{
        fontSize: 15,
        textAlign: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        marginBottom: 30,
        color: 'white'
    },
    userMail: {
        justifyContent:'center',
        flexDirection:'row',
        height: 40,
      }, 
      input: {
        backgroundColor:'#fff',
        borderRadius:5,
        //marginBottom:30,
        borderWidth:1.5,
        borderColor: 'darkblue',
        width: '90%',
      },
      loginScreenButton: {
        justifyContent: 'center',
        flexDirection:'row',
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#05132e',
        borderRadius:10,
        borderWidth: 1,
        marginBottom: 30,
        marginHorizontal: 20,
      },
      loginText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:15,
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
      },
      
})