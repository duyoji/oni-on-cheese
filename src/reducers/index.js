const getDefaultState = () => {
  return {
    roomId: null,
    rooms: []
  }
};

const reducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case 'CREATE_GAME':
      return Object.assign({}, state, {
        roomId: action.roomId
      });
    case 'JOIN_ROOM':
      return Object.assign({}, state, {
        roomId: action.roomId
      });
    case 'GET_ROOMS':
      const rooms = action.roomIds.map((roomId) => {
        return {roomId}
      });
      return Object.assign({}, state, {
        rooms
      });
    default:
      return state;
  }
};

export default reducer;
export { getDefaultState };