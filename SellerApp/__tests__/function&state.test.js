import 'react-native';
import React from 'react';
import Random from '../examples/Random';
import renderer from 'react-test-renderer';

it('Function should return value multiplied by 10', () => {
    let random = renderer.create(<Random />).getInstance();

    let result = random.multiplyBy10(2);
    expect(result).toEqual(20);
})

it('State should be changed on the current value', () => {
    let random = renderer.create(<Random />).getInstance();

    random.changeState(300);
    expect(random.state.data).toEqual(300);
})
