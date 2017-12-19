import React from 'react';
import ReactDOM from 'react-dom';
import GameListPage from '../../components/GameListPage';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('src/components/GameListPage.jsx', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow( <GameListPage /> );
  });

  it('redirect to login page.', () => {
    expect(wrapper.find(".gameListPage").length).toBe(1);
  });
});
