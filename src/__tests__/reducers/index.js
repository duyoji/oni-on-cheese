import reducer, { getDefaultState } from '../../reducers/index';
describe('src/reducers/index.js', () => {
  describe('The getDefaultState function', () => {
    it('should includes expected prop', () => {
      const expectedProps = ['roomId'];
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
  });
});

const createDummyAction = (type = 'default', obj) => {
  return Object.assign({type}, obj);
};