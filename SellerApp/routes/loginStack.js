import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../screens/login';
import Header from '../components/headerLogin';
import React from 'react';


const screens = {
    LogIn: {
        screen: Login,
        navigationOptions: ({ navigation }) => {
            return {
                headerLeft:()=> null,
                headerTitle: () => <Header navigation={navigation} title='Log In' />
            }
        }
    },
};

const LoginStack = createStackNavigator (screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#05132e', height: 80, },
   }
});

export default createAppContainer(LoginStack);