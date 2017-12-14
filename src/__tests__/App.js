import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// http://airbnb.io/enzyme/docs/api/ShallowWrapper/contains.html
describe('App component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('.App')).to.have.length(1);
  });

});