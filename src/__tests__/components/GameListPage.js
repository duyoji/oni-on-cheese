import React from 'react';
import ReactDOM from 'react-dom';
import GameListPage from '../../components/GameListPage';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mockGetRooms = () => {};
const mockJoinRoom = () => {};
const ROOM_IDS = ['room1', 'room2', 'room3'];

describe('src/components/GameListPage.jsx', () => {
  let wrapper;
  const ROOM_IDS = ['room1', 'room2', 'room3'];
  beforeEach(() => {
    wrapper = shallow( <GameListPage
      getRooms={mockGetRooms}
      joinRoom={mockJoinRoom}
      roomIds={ROOM_IDS}
    /> );
  });

  it('shows room list.', () => {
    expect(wrapper.find(ListGroup).length).toEqual(1);
    expect(wrapper.find(ListGroupItem).length).toEqual(3);
  });
});
