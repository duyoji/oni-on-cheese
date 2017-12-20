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
      const result = reducer(
        getDefaultState(),
        createDummyAction()
      );
      expect(result).toEqual(getDefaultState());
    });
  });
});

const createDummyAction = (type = 'default') => {
  return {type};
};