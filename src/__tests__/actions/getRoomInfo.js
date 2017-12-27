import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getRoomInfo } from '../../actions/getRoomInfo';
import * as getPlayersHelper from '../../actions/helpers/getPlayersHelper';
import * as getRoomsHelper from '../../actions/helpers/getRoomsHelper';
import { getDefaultState } from '../../reducers/index';
import socket from '../../socketHandlers/index';
import { getRoomIdsPromise } from '../../actions/helpers/getRoomsHelper';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('src/actions/getRoomInfo.js', () => {
  it('should call callback function with expected data', () => {
    const store = mockStore(getDefaultState());
    const roomIds = ['room1', 'room2', 'room3'];
    const expectedRoom = {
      roomId: 'room1',
      numberOfPlayers: 2
    };
    sinon.stub(getRoomsHelper, 'getRoomIdsPromise').callsFake(() => {
      return Promise.resolve(roomIds);
    });
    sinon.stub(getPlayersHelper, 'getPlayersPromise').callsFake((roomIds) => {
      return Promise.resolve(room);
    });
    const dummyCallback = (room) => {
      expect(room).toEqual(epectedRoom);
    };
    getRoomInfo(dummyCallback)
    
    getPlayersHelper.getPlayersPromise.restore();
    getRoomsHelper.getRoomIdsPromise.restore();
  });
});