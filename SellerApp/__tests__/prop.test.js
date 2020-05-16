import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Receiver from '../src/Receiver';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

configure({ adapter: new Adapter() });

it('Props testing', () => {
    const wrapper = shallow(<Receiver data="Some text for testing..." />).props();
    console.log(wrapper.children.props.children);

    expect(wrapper.children.props.children).toEqual("Some text for testing...");
})
