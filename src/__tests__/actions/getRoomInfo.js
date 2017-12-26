import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getRoomInfo } from '../../actions/getRoomInfo';
import * as getPlayersHelper from '../../actions/helpers/getPlayersHelper';
import * as getRoomsHelper from '../../actions/helpers/getRoomsHelper';
import { getDefaultState } from '../../reducers/index';
import socket from '../../socketHandlers/index';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('src/actions/getRoomInfo.js', () => {
  it('should dispatch action', () => {
    const store = mockStore(getDefaultState());
    const roomIds = ['room1', 'room2', 'room3'];
    const expectedRooms = [
      {roomId: 'room1', numberOfPlayers: 2},
      {roomId: 'room2', numberOfPlayers: 50},
      {roomId: 'room3', numberOfPlayers: 100}
    ];
    sinon.stub(getRoomsHelper, 'getRoomIdsPromise').callsFake(() => {
      return Promise.resolve(roomIds);
    });
    sinon.stub(getPlayersHelper, 'getPlayersPromise').callsFake((roomIds) => {
      return [
        Promise.resolve(expectedRooms[0]),
        Promise.resolve(expectedRooms[1]),
        Promise.resolve(expectedRooms[2])
      ];
    });

    return store.dispatch( getRoomInfo() )
    .then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions[0]).toEqual({
        type: 'GET_ROOM_INFO',
        rooms: expectedRooms
      });
      getRoomsHelper.getRoomIdsPromise.restore();
      getPlayersHelper.getPlayersPromise.restore();
    });
  });
});