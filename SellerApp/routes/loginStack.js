import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { View, Text } from 'react-native';
import Login from '../screens/login';
import Start from '../screens/start';
import Header from '../components/headerLogin';
import React from 'react';
import GuestMenu from '../screens/guestMenu';

import ForgotPassword from '../screens/forgotPassword';

import FilterIngredients from '../screens/filterIngredients';


const screens = {
    Start: {
        screen: Start,
        navigationOptions: ({ navigation }) => {
            return {
                title: '',
                headerStyle: {height: 0,},
            }
        }
    },
    LogIn: {
        screen: Login,
        navigationOptions: ({ navigation }) => {
            return {
                headerLeft:()=> null,
                headerTitle: () => <Header navigation={navigation} title='Log In' />
            }
        }
    },
    Offer: {
        screen: GuestMenu,
        navigationOptions: ({ navigation }) => {
            return {
                title: '',
                headerStyle: {height: 0,},
                headerLeft: () => <View></View>
            }
        }
    },

    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'Forgot password',
                headerTintColor: '#fff',
            }
        }
    },

    Filter: {
        screen: FilterIngredients,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Text style={{fontFamily: 'IndieFlower-Regular', fontSize: 26,}}>Filter products</Text>,
                headerStyle: {backgroundColor: '#F5F5F5', height: 80,},
                headerBackTitle: () => <Text style={{fontFamily: 'IndieFlower-Regular', fontSize: 22,}}>Back</Text>,

            }
        }
    }
};

const LoginStack = createStackNavigator (screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#05132e', height: 80, },
   }
});

export default createAppContainer(LoginStack);