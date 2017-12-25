import React from 'react';
import ReactDOM from 'react-dom';
import GameListPage from '../../components/GameListPage';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { shallow } from '../helpers/configuredEnzymeWithAdapter';

const mockGetRooms = () => {};
const mockJoinRoom = () => {};
const rooms = [
  {roomId: 'id1', numberOfPlayers: 2},
  {roomId: 'id2', numberOfPlayers: 50},
  {roomId: 'id3', numberOfPlayers: 100}
];

describe('src/components/GameListPage.jsx', () => {
  describe('Before selecting a roomId.', () => {
    it('shows room list.', () => {
      const wrapper = shallow( <GameListPage
        getRooms={mockGetRooms}
        joinRoom={mockJoinRoom}
        rooms={rooms}
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
        rooms={rooms}
        selectedRoomId={rooms[0].roomId}
      /> );

      expect(wrapper.find(Redirect).length).toEqual(1);
    });
  });
});
