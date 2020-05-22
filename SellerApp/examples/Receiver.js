import React from 'react';
import { View, Text } from 'react-native';

export default class Receiver extends React.Component {
    render() {
        return (
            <View style={{}}>
                <Text style={{ fontSize: 30 }}>{this.props.data}</Text>
            </View>
        )
    }
}