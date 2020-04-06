import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import DisplayOrders from '../screens/displayOrders';
import Header from '../components/header';
import React from 'react';
import OrderContent from '../screens/orderContent';


const screens = {
    DisplayOrders: {
        screen: DisplayOrders,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Orders' />
            }
        }
    },
    OrderContent: {
        screen: OrderContent,
        navigationOptions: ({ navigation }) => {
            //navigation.navigate('DisplayOrders');
            return {
                title: 'Order',
                headerBackTitle: 'Back',
            }
        }
    },
};

const OrderStack = createStackNavigator (screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#05132e', height: 80, },
        headerTintColor: '#fff',
        //componen: DisplayOrders
   }
});

export default createAppContainer(OrderStack);