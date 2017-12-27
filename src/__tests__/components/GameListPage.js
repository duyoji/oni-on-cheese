import React from 'react'; // eslint-disable-line no-unused-vars
import GameListPage from '../../components/GameListPage'; // eslint-disable-line no-unused-vars
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { shallow } from '../helpers/configuredEnzymeWithAdapter';

const mockGetRooms = () => {};
const mockJoinRoom = () => {};
const ROOM_IDS = ['room1', 'room2', 'room3'];

describe('src/components/GameListPage.jsx', () => {
  describe('Before selecting a roomId.', () => {
    it('shows room list.', () => {
      const wrapper = shallow( <GameListPage
        getRooms={mockGetRooms}
        joinRoom={mockJoinRoom}
        roomIds={ROOM_IDS}
      /> );

      expect(wrapper.find(ListGroup).length).toEqual(1);
      expect(wrapper.find(ListGroupItem).length).toEqual(3);
    });
  });

  describe('After selecting a roomId.', () => {
    it('redirect to.', () => {
      const wrapper = shallow( <GameListPage
        getRooms={mockGetRooms}
        joinRoom={mockJoinRoom}
        roomIds={ROOM_IDS}
        selectedRoomId={ROOM_IDS[0]}
      /> );

      expect(wrapper.find(Redirect).length).toEqual(1);
    });
  });
});
