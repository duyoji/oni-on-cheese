import reducer, { getDefaultState } from '../../reducers/index';
describe('src/reducers/index.js', () => {
  describe('The getDefaultState function', () => {
    it('should includes expected prop', () => {
      const expectedProps = ['roomIds'];
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

    it('updates roomIds when action type is `GET_ROOMS`.', () => {
      const roomIds = ['id1', 'id2', 'id3'];
      const state = reducer(
        getDefaultState(),
        createDummyAction('GET_ROOMS', {roomIds})
      );
      expect(state.roomIds).toEqual(roomIds);
    });
  });
});

const createDummyAction = (type = 'default', obj) => {
  return Object.assign({type}, obj);
};