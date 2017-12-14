import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('.App')).to.have.length(1);
  });
});