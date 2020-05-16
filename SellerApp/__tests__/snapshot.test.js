import 'react-native';
import React from 'react';
import Parent from '../src/Parent';
import renderer from 'react-test-renderer';

test('Snapshot for Parent component', () => {
    const snap = renderer.create(<Parent />).toJSON();
    expect(snap).toMatchSnapshot();
});