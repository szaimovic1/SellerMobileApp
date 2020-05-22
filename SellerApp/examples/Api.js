import React from 'react';
import { View, TextInput } from 'react-native';

export default class Api extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TextInput id={'username'} onChangeText={(text) => this.setState({ username: text })}
                    style={{ backgroundColor: 'gray', marginBottom: 15 }} placeholder="Enter username..." >
                </TextInput>
                <TextInput id={'password'} onChangeText={(text) => this.setState({ password: text })}
                    style={{ backgroundColor: 'gray', marginBottom: 15 }} placeholder="Enter password..." >
                </TextInput>
            </View>
        );
    }
}