const defaultState = {
  roomId: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_GAME': {
      return Object.assign({}, state, {
        roomId: action.roomId
      });
    };
    default:
      return state;
  }
};

export default reducer;