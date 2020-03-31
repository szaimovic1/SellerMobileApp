import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 50,
    color:'#fff'
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor:'#fff',
    borderRadius:5,
    marginBottom:30,
    borderBottomWidth:1.5,
    borderBottomColor: 'darkblue',
    width:300
  },
  parent: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom:80
  },
  employeeImage: {
    width:100,
    height:100,
    alignSelf:'center',
    marginBottom:40
  },
  userPass: {
    marginLeft:13,
    justifyContent:'center',
    flexDirection:'row',
    height: 70,
  
  }, 
  loginScreenButton: {
    marginRight:20,
    marginLeft:20,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#05132e',
    borderRadius:10,
    borderWidth: 1,
  },
  loginText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:15,
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  }
})

