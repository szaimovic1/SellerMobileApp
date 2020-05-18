import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import DisplayTables from '../screens/displayTables';
import Header from '../components/header';

export const tableStack = (data) => {
    var screenTitle = data.placeName;
    const screens = {
        DisplayTables: {
            screen: DisplayTables,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: () => <Header navigation={navigation} title={screenTitle} />
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
    return createAppContainer(TableStack);
}