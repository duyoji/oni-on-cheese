import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import App from '../../components/App'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import { createStore } from 'redux';
import { mount } from '../helpers/configuredEnzymeWithAdapter';
import { getDefaultState } from '../../reducers/index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import socket from '../../socketHandlers/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('src/components/App.jsx', () => {
  afterAll(() => {
    socket.disconnect();
  });

  describe('When access to `/`', () => {
    it('redirect to login page.', () => {
      const wrapper = createWrapper('/');
      expect(wrapper.find('.topPage').length).toBe(1);
    })
  });

  describe('When access to `/game-list`', () => {
    it('shows GameListPage', () => {
      const wrapper = createWrapper('/game-list');
      expect(wrapper.find('.gameListPage').length).toBe(1);
    });
  });
});

const createWrapper = (path) => {
const store = mockStore(getDefaultState());

  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};