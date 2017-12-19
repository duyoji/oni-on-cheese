import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Link } from 'react-router-dom';
import App from '../../components/App';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import { createStore } from 'redux';

configure({ adapter: new Adapter() });

describe('src/components/App.jsx', () => {
  describe('When access to `/game-list`', () => {
    it('shows GameListPage', () => {
      const wrapper = createWrapper('/game-list');
      expect(wrapper.find('.gameListPage').length).toBe(1);
    });
  });
});

const createWrapper = (path) => {
  const mockReducer = () => {};
  const store = createStore(mockReducer);

  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};