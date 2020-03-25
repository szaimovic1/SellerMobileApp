import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../screens/login';
import Header from '../components/header';
import React from 'react';


const screens = {
    LogIn: {
        screen: Login,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Log In' />
            }
        }
    },
};

const LoginStack = createStackNavigator (screens, {
    defaultNavigationOptions: {
        headerStyle: { height: 80},
   }
});

export default createAppContainer(LoginStack);