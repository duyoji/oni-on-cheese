import { getPlayers } from '../../actions/getPlayers';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as helper from '../../actions/helpers/getPlayersHelper';
import { getDefaultState } from '../../reducers/index';
import socket from '../../socketHandlers/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('src/actions/getPlayers.js', () => {
  afterAll(() => {
    socket.disconnect();
  });

  it('should dispatch action after receiving socket event', () => {
    const store = mockStore(getDefaultState());
    const rooms = [
      {roomId: 'id1', numberOfPlayers: 2},
      {roomId: 'id2', numberOfPlayers: 50},
      {roomId: 'id3', numberOfPlayers: 100}
    ];
    
    sinon.stub(helper, 'getPlayersPromise').callsFake((rooms) => {
      return [
        Promise.resolve(rooms[0]),
        Promise.resolve(rooms[1]),
        Promise.resolve(rooms[2])
      ];
    });

    return store.dispatch( getPlayers(rooms) )
      .then((rooms) => {
        const expectedActions = store.getActions();
        expect(expectedActions[0]).toEqual({
          type: 'GET_PLAYERS',
          rooms
        });
        helper.getPlayersPromise.restore();
      });
  });
});