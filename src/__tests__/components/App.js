import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import App from '../../components/App';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import { createStore } from 'redux';

configure({ adapter: new Adapter() });

describe('src/components/App.jsx', () => {
  describe('When access to `/`', () => {
    it('redirect to login page.', () => {
      const wrapper = createWrapper('/');
      expect(wrapper.find(".topPage").length).toBe(1);
      expect(wrapper.find(".roomsPage").length).toBe(0);
      expect(wrapper.find(".mapPage").length).toBe(0);
      expect(wrapper.find(Link).exists()).toEqual(true);
      expect(wrapper.find(Button).exists()).toEqual(true);
    });
  });

  xdescribe('When access to `/login`', () => {
    it('render login page.', () => {
      const wrapper = createWrapper('/login');
      expect(wrapper.find(".loginPage").length).toBe(1);
      expect(wrapper.find(".roomsPage").length).toBe(0);
      expect(wrapper.find(".mapPage").length).toBe(0);
      expect(wrapper.find(Link).exists()).toEqual(true);
      expect(wrapper.find(Button).exists()).toEqual(true);
    });
  });

  xdescribe('When access to `/rooms`', () => {
    it('render login page.', () => {
      const wrapper = createWrapper('/rooms');
      expect(wrapper.find(".loginPage").length).toBe(0);
      expect(wrapper.find(".roomsPage").length).toBe(1);
      expect(wrapper.find(".mapPage").length).toBe(0);
      expect(wrapper.find(Link).exists()).toEqual(true);
      expect(wrapper.find(Button).exists()).toEqual(true);
    });
  });

  xdescribe('When access to `/map`', () => {
    it('render login page.', () => {
      const wrapper = createWrapper('/map');
      expect(wrapper.find(".loginPage").length).toBe(0);
      expect(wrapper.find(".roomsPage").length).toBe(0);
      expect(wrapper.find(".mapPage").length).toBe(1);
      expect(wrapper.find(Link).exists()).toEqual(true);
      expect(wrapper.find(Button).exists()).toEqual(true);
    });
  });
});

const createWrapper = (path) => {
  const mockReducer = (state, action) => {
    return Object.assign({}, state, {
      roomId: action.roomId
    });
  };
  const store = createStore(mockReducer);

  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};