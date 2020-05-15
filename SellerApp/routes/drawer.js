import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import LoginStack from './loginStack';
import OrderStack from './orderStack';
import { tableStack } from './tableStack';
import TableNumberStack from './tableNumberStack';
import ProfileStack from './profileStack';
import { Image } from 'react-native';
import React from 'react';

export const createNav = (data) => {
    var TableStack = tableStack(data);
    var placeName = data.placeName;
    var navigation = { 
        LogOut: {
            screen: LoginStack,
            navigationOptions: () => ( { title: 'Main pages:', drawerLockMode: 'locked-closed', } )
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
        [placeName]: {
            screen: TableStack,
            navigationOptions: {
                drawerIcon: (<Image style={{ width: 26, height: 26 }} source={require("../images/circle.png")}/> )}
        },
        Device: {
            screen: TableNumberStack,
            navigationOptions: {
                drawerIcon: (<Image style={{ width: 26, height: 26 }} source={require("../images/tablet.jpg")}/> )}
        },
        Profile: {
            screen: ProfileStack,
            navigationOptions: {
                drawerIcon: (<Image style={{ width: 26, height: 26 }} source={require("../images/employee.png")}/> )}  
        }
        /* Ovdje ubaciti ostale prozore koji trebaju biti opcija u meniju */ 
    }
    const RootDrawerNavigator = createDrawerNavigator(navigation);
    return createAppContainer(RootDrawerNavigator);
}
