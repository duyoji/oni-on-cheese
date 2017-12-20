const getDefaultState = () => {
  return {
    roomIds: []
  }
};

const reducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case 'GET_ROOMS':
      return Object.assign({}, state, {
        roomIds: action.roomIds
      });
    default:
      return state;
  }
};

export default reducer;
export { getDefaultState };