import reducer, { getDefaultState } from '../../reducers/index';
describe('src/reducers/index.js', () => {
  describe('The getDefaultState function', () => {
    it('should includes expected prop', () => {
      const expectedProps = ['roomId', 'rooms'];
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
    
    it('updates the number of players when action type is `GET_ROOM_INFO`.', () => {
      const rooms = [
        {roomId: 'id1', numberOfPlayers: 2},
        {roomId: 'id2', numberOfPlayers: 40},
        {roomId: 'id3', numberOfPlayers: 23}
      ];
      const state = reducer(
        getDefaultState(),
        createDummyAction('GET_ROOM_INFO', {rooms})
      );
      expect(state.rooms).toEqual(rooms);
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
  });
});

const createDummyAction = (type = 'default', obj) => {
  return Object.assign({type}, obj);
};