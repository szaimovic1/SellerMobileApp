import React from 'react';
import { Text, View } from 'react-native';

export default class Child extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>Profile Component</Text>
            </View>
        );
    }
}