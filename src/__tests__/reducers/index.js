import reducer, { getDefaultState } from '../../reducers/index';
describe('src/reducers/index.js', () => {
  describe('The getDefaultState function', () => {
    it('should includes expected prop', () => {
      const expectedProps = ['roomId', 'roomIds'];
      const state = getDefaultState();
      expectedProps.forEach(prop => {
        expect( state.hasOwnProperty(prop) ).toEqual(true);
      });
    });
  });

  describe('The reducer function', () => {
    it('returns object when called with action.', () => {
      const state = reducer(
        getDefaultState(),
        createDummyAction()
      );
      expect(state).toEqual(getDefaultState());
    });

    it('updates roomId when action type is `JOIN_ROOM`.', () => {
      const roomId = 'asdfqwerqwerq09u0912f';
      const state = reducer(
        getDefaultState(),
        createDummyAction('JOIN_ROOM', {roomId})
      );
      expect(state.roomId).toEqual(roomId);
    });

    it('updates roomIds when action type is `GET_ROOMS`.', () => {
      const roomIds = ['id1', 'id2', 'id3'];
      const state = reducer(
        getDefaultState(),
        createDummyAction('GET_ROOMS', {roomIds})
      );
      expect(state.roomIds).toEqual(roomIds);
    });

    describe('UPDATE_LOCATION', () => {
      let state = getDefaultState();
      state.users = [
        { id: 1, location: { latitude: 1, longitude:2 } },
        { id: 2, location: { latitude: 3, longitude:4 } },
        { id: 3, location: { latitude: 5, longitude:6 } }
      ];

      it('updates targetUser when state.users already has the user.', () => {
        const updatedUser = {
          id: 2,
          location: {
            latitude: 9999,
            longitude: -9999
          }
        };
        state = reducer(
          state,
          createDummyAction('UPDATE_LOCATION', {user: updatedUser})
        );
        expect(state.users).toEqual([
          { id: 1, location: { latitude: 1, longitude:2 } },
          { id: 2, location: { latitude: 9999, longitude: -9999 } },
          { id: 3, location: { latitude: 5, longitude:6 } }
        ]);
      });

      it('append a new User when state.users doesn not have the user', () => {
        const appendedUser = {
          id: 100,
          location: {
            latitude: 123,
            longitude: 321
          }
        };
        state = reducer(
          state,
          createDummyAction('UPDATE_LOCATION', {user: appendedUser})
        );

        expect(state.users).toEqual([
          { id: 1, location: { latitude: 1, longitude:2 } },
          { id: 2, location: { latitude: 9999, longitude: -9999 } },
          { id: 3, location: { latitude: 5, longitude:6 } },
          appendedUser,
        ]);
      });
    });

    describe('LEAVE_ROOM', () => {
      let state = getDefaultState();
      state.users = [
        { id: 1, location: { latitude: 1, longitude:2 } },
        { id: 2, location: { latitude: 3, longitude:4 } },
        { id: 3, location: { latitude: 5, longitude:6 } }
      ];

      it('delete target user from state.users with userId', () => {
        const deleteUserId = state.users[1].id; // id=2
        const nonExistUserId = 'NON_EXIST';
        state = reducer(
          state,
          createDummyAction('LEAVE_ROOM', {userId: deleteUserId})
        );
        state = reducer(
          state,
          createDummyAction('LEAVE_ROOM', {userId: nonExistUserId})
        );
        expect(state.users).toEqual([
          { id: 1, location: { latitude: 1, longitude:2 } },
          { id: 3, location: { latitude: 5, longitude:6 } }
        ]);
      });
    });

    describe('CONNECTED_TO_SOCKET', () => {
      let state = getDefaultState();
      const SOCKET_ID = 'fjasjfalksdjfl;ajsdl;fkjasd';

      it('sets socketId to state.', () => {
        expect(state.socketId).toEqual(null);

        state = reducer(
          state,
          createDummyAction('CONNECTED_TO_SOCKET', {socketId: SOCKET_ID})
        );

        expect(state.socketId).toEqual(SOCKET_ID);
      });
    });

    describe('SET_USER_NAME', () => {
      let state = getDefaultState();
      const USER_NAME = 'DUMMY_USER_NAME';

      it('sets userName to state.', () => {
        expect(state.socketId).toEqual(null);

        state = reducer(
          state,
          createDummyAction('SET_USER_NAME', {userName: USER_NAME})
        );

        expect(state.userName).toEqual(USER_NAME);
      });
    });

    describe('CLEAR_USERS', () => {
      let state = getDefaultState();
      it('clear users in state.', () => {
        expect(state.users).toEqual([]);
        const DUMMY_USER_1 = {id:1, location:{lat:1, lng:2}};
        const DUMMY_USER_2 = {id:2, location:{lat:1, lng:2}};

        // SET dummy data
        state = reducer(
          state,
          createDummyAction('UPDATE_LOCATION', {user: DUMMY_USER_1})
        );
        state = reducer(
          state,
          createDummyAction('UPDATE_LOCATION', {user: DUMMY_USER_2})
        );
        expect(state.users).toEqual([DUMMY_USER_1, DUMMY_USER_2]);

        // test what I want to test here.
        state = reducer(
          state,
          createDummyAction('CLEAR_USERS')
        );
        expect(state.users).toEqual([]);
      });
    });
  });
});

const createDummyAction = (type = 'default', obj) => {
  return Object.assign({type}, obj);
};