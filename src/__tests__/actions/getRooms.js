import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getRooms } from '../../actions/getRooms';
import * as helper from '../../actions/helpers/getRoomsHelper';
import { getDefaultState } from '../../reducers/index';
import socket from '../../socketHandlers/index';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('src/__tests__/actions/getRooms.js', () => {
  afterAll(() => {
    socket.disconnect();
  });

  it('should dispatch action after receiving socket event.', () => {
    const store = mockStore(getDefaultState());

    const roomIds = ['room1', 'room2', 'room3'];
    sinon.stub(helper, 'getRoomsPromise').callsFake(() => {
      return Promise.resolve(roomIds);
    });

    return store.dispatch( getRooms() )
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions[0]).toEqual({
          type: 'GET_ROOMS',
          roomIds
        });

        helper.getRoomsPromise.restore();
      });
  });
});