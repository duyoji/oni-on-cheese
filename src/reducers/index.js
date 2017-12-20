const getDefaultState = () => {
  return {
    roomId: null,
    roomIds: []
  }
};

const reducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return Object.assign({}, state, {
        roomId: action.roomId
      });
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