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

    it('updates roomIds when action type is `GET_ROOMS`.', () => {
      const roomIds = ['id1', 'id2', 'id3'];
      const rooms = [
        {roomId: 'id1'},
        {roomId: 'id2'},
        {roomId: 'id3'},
      ];
      const state = reducer(
        getDefaultState(),
        createDummyAction('GET_ROOMS', {roomIds})
      );
      expect(state.rooms).toEqual(rooms);
    });
    it('updates the number of players when action type is `GET_PLAYERS`.', () => {
      const rooms = [
        {roomId: 'id1', numberOfPlayers: 2},
        {roomId: 'id2', numberOfPlayers: 40},
        {roomId: 'id3', numberOfPlayers: 23}
      ];
      const state = reducer(
        getDefaultState(),
        createDummyAction('GET_PLAYERS', {rooms})
      );
      expect(state.rooms).toEqual(rooms);
    })
  });
});

const createDummyAction = (type = 'default', obj) => {
  return Object.assign({type}, obj);
};