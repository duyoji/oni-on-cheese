const getDefaultState = () => {
  return {
    roomId: null,
    roomIds: [],
    users: [],
    socketId: null,
    userName: null,
  };
};

const reducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case 'CREATE_GAME': {
      return Object.assign({}, state, {
        roomId: action.roomId
      });
    }
    case 'JOIN_ROOM': {
      return Object.assign({}, state, {
        roomId: action.roomId
      });
    }
    case 'GET_ROOMS': {
      return Object.assign({}, state, {
        roomIds: action.roomIds
      });
    }
    case 'UPDATE_LOCATION': {
      const users = [...state.users];
      const targetUser = users.find(user => user.id === action.user.id);
      if(!targetUser) {
        users.push(action.user);
      } else {
        Object.assign(targetUser, action.user);
      }
      return Object.assign({}, state, {users});
    }
    case 'LEAVE_ROOM': {
      const users = state.users.filter(user => user.id !== action.userId);
      return Object.assign({}, state, {users});
    }
    case 'CONNECTED_TO_SOCKET': {
      return Object.assign({}, state, {
        socketId: action.socketId
      });
    }
    case 'SET_USER_NAME': {
      return Object.assign({}, state, {
        userName: action.userName
      });
    }
    case 'CLEAR_USERS': {
      return Object.assign({}, state, {
        users: []
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
export { getDefaultState };