/**
 * id: string
 * name: string
 * iconUrl: string
 * location: object {latitude, longitude}
 */
const updateLocation = (user = {id, name, iconUrl, location}) => {
  return {
    type: 'UPDATE_LOCATION',
    user
  }
};

export { updateLocation };