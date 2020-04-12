import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import LoginStack from './loginStack';
import OrderStack from './orderStack';
import { Image } from 'react-native';
import React from 'react';

const RootDrawerNavigator = createDrawerNavigator({
    LogOut: {
        screen: LoginStack,
        navigationOptions: () => ( { title: 'Main pages:' } )
    },
    Products: {
        screen: HomeStack,
        navigationOptions: {
            drawerIcon: (<Image style={{ width: 30, height: 30 }} source={require("../images/products.png")}/> )}
    },
    Orders: {
        screen: OrderStack,
        navigationOptions: {
            drawerIcon: (<Image style={{ width: 26, height: 26 }} source={require("../images/orders.png")}/> )}
    },
    /* Ovdje ubaciti ostale prozore koji trebaju biti opcija u meniju */ 
});

export default createAppContainer(RootDrawerNavigator);