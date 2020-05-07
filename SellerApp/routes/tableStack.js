import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import DisplayTables from '../screens/displayTables';
import Header from '../components/header';

const screens = {
    DisplayTables: {
        screen: DisplayTables,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Tables' />
            }
        }
    }
};
const TableStack = createStackNavigator (screens, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#05132e', height: 80, },
        headerTintColor: '#fff',
   }
});

export default createAppContainer(TableStack);