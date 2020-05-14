import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ChangeTableNr from '../screens/tableNumber';
import Header from '../components/header';
import React from 'react';

const screens = {
    ChangeTableNr: {
        screen: ChangeTableNr,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Device name' />
            }
        }
    },
};

const TableNumberStack = createStackNavigator (screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#05132e', height: 80, },
        headerTintColor: '#fff',
        //componen: DisplayOrders
   }
});

export default createAppContainer(TableNumberStack);
