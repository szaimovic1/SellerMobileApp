import React from 'react';
import { View } from 'react-native';
import Child from './Child';

export default class Parent extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Child />
            </View>
        );
    }
}