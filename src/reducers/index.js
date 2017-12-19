const defaultState = {
  currentView: 'Top'
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_GAME': {
      return Object.assign({}, state, {
        currentView: 'GameList'
      });
    };
    default:
      return state;
  }
};

export default reducer;