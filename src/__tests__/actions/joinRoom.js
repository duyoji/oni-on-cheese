import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { joinRoom } from '../../actions/joinRoom';
import * as helper from '../../actions/helpers/joinRoomHelper';
import { getDefaultState } from '../../reducers/index';
import socket from '../../socketHandlers/index';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('src/__tests__/actions/joinRoom.js', () => {
  afterAll(() => {
    socket.disconnect();
  });

  it('should dispatch action after receiving socket event.', () => {
    const store = mockStore(getDefaultState());
    const roomId = '/i0@qu3#io@osdiah8';

    sinon.stub(helper, 'joinRoomPromise').callsFake(() => {
      return Promise.resolve();
    });

    return store.dispatch( joinRoom(roomId) )
      .then((data) => {
        const expectedActions = store.getActions();
        expect(expectedActions[0]).toEqual({
          type: 'JOIN_ROOM',
          roomId
        });

        helper.joinRoomPromise.restore();
      });
  });
});