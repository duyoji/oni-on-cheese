const getDefaultState = () => {
  return {
    roomId: null
  }
};

const reducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return Object.assign({}, state, {
        roomId: action.roomId
      });
    default:
      return state;
  }
};

export default reducer;
export { getDefaultState};