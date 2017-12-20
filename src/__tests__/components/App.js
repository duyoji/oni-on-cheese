import React from 'react'; // eslint-disable-line no-unused-vars
import { MemoryRouter } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import App from '../../components/App'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import { createStore } from 'redux';
import { mount } from '../helpers/configuredEnzymeWithAdapter';

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