import 'react-native';
import React from 'react';
import LoginForm from '../examples/LoginForm';
import renderer from 'react-test-renderer';

const findElement = (tree, element) => {
    let result = undefined;
    for (node in tree.children) {
        if (tree.children[node].props.id == element) {
            result = true;
        }
    }

    return result;
}

it('Element should be found', () => {
    let tree = renderer.create(<LoginForm />).toJSON();

    expect(findElement(tree, 'username')).toBeDefined();
});