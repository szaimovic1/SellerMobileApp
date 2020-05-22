import React from 'react';
import { View } from 'react-native';
import Receiver from './Receiver';

export default class Receiver extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Receiver data="some text..." />
            </View>
        );
    }
}