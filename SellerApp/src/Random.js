import React from 'react';
import { View } from 'react-native';

export default class Random extends React.Component {
    constructor() {
        super();
        this.state = {
            data: 73,
        }
    }

    componentDidMount() {

    }

    changeState(x) {
        this.setState({ data: x });
    }

    multiplyBy10(x) {
        return x * 10;
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}></View>
        );
    }
}