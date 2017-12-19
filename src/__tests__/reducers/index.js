import reducer from '../../reducers/index';

describe('src/reducers/index.js', () => {
  it('should be a function', () => {
    expect(typeof reducer).toEqual('function');
  });
  it('returns object when called with action.', () => {
    const result = reducer(
      createDummyState(),
      createDummyAction()
    );
    expect(typeof result).toEqual('object');
  });
});

const createDummyState = (data = {}) => {
  return data;
};

const createDummyAction = (type = 'DUMMY_TYPE') => {
  return {type};
};