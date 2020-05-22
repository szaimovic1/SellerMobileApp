import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Receiver from '../examples/Receiver';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

configure({ adapter: new Adapter() });

it('Props testing', () => {
    const wrapper = shallow(<Receiver data="Some text for testing..." />).props();

    expect(wrapper.children.props.children).toEqual("Some text for testing...");
})
