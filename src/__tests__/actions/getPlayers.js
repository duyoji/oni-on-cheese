import { getPlayers } from '../../actions/getPlayers';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getPlayersHelper } from '../../actions/helpers/getPlayersHelper';
import { getDefaultState } from '../../reducers/index';
import socket from '../../socketHandlers/index';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('src/actions/getPlayers.js', () => {
  afterAll(() => {
    socket.disconnect();
  })
  it('should dispatch action after receiving socket event', () => {
    
  });
});