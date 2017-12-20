const getDefaultState = () => {
  return {
    roomId: null
  }
};

const reducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
export { getDefaultState };