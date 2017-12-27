const defaultOption = {
  enableHighAccuracy: true,  //
  maximumAge        : 30000, // cached last position for 30 seconds
  timeout           : 30000  // 30 seconds
};

const getCurrentPosition = (
  {
    success = ({latitude, longitude}) => {}, // eslint-disable-line no-unused-vars
    error = (err) => {}, // eslint-disable-line no-unused-vars
    options = defaultOption
  }
) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      success({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    error,
    options
  );
};

const watchPosition = (
  {
    success = ({latitude, longitude}) => {}, // eslint-disable-line no-unused-vars
    error = (err) => {}, // eslint-disable-line no-unused-vars
    options = defaultOption
  }
) => {
  navigator.geolocation.watchPosition(
    (position) => {
      success({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    error,
    options
  );
};

export { getCurrentPosition, watchPosition };