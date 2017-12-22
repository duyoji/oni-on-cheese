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
    const playerIds = [2, 50, 100];
    sinon.stub(helper, 'getPlayersPromise').callsFake(() => {
      return Promise.resolve(playerIds);
    });

    return store.dispatch(getPlayers())
      .then((data) => {
        const expectedActions = store.getActions();
        expect(expectedActions[0]).toEqual({
          type: 'GET_PLAYERS',
          playerIds
        });

        helper.getPlayersPromise.restore();
      });
  });
});