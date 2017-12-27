import { getRoomsPromise } from './helpers/getRoomsHelper';

const getRooms = () => {
  return async function (dispatch) {
    try {
      const roomIds = await getRoomsPromise();
      dispatch(getRoomsSuccess(roomIds));
    } catch(err) {
      // TODO: We have to decide a specification when error happen.
      console.error(err);
    }
  };
};

const getRoomsSuccess = (roomIds) => ({
  type: 'GET_ROOMS',
  roomIds
});

export { getRooms };