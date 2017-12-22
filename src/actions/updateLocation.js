/**
 * See: server/models/User.js
 * user:
 *   id: string
 *   name: string
 *   iconUrl: string
 *   location: object {latitude, longitude}
 */
const updateLocation = (user) => {
  return {
    type: 'UPDATE_LOCATION',
    user
  }
};

export { updateLocation };