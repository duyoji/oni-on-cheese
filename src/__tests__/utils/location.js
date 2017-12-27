import { getCurrentPosition, watchPosition } from '../../utils/location';

describe('src/utils/location.js', () => {
  const DUMMY_LATITUDE = 9999;
  const DUMMY_LONGITUDE = -9999;
  const DUMMY_ERROR = {
    code: 1234,
    message: 'This is dummy error.'
  };
  let callbackForSuccess = ({latitude, longitude}) => {};
  let callbackForError = (err) => {};

  describe('The getCurrentPosition function', () => {
    let isSuccess = true;

    beforeAll(() => {
      navigator.geolocation = navigator.geolocation || {};
      navigator.geolocation.getCurrentPosition
        = navigator.geolocation.getCurrentPosition || function(success, error, options) {
          if(isSuccess) {
            const position = {
              latitude: DUMMY_LATITUDE,
              longitude: DUMMY_LONGITUDE
            };
            callbackForSuccess(position);
          } else {
            callbackForError(DUMMY_ERROR);
          }
        };
    });

    afterAll(() => {
      if(navigator.geolocation.getCurrentPosition.mockRestore) {
        navigator.geolocation.getCurrentPosition.mockRestore();
      }
    });

    it('returns location data when getting location succeeded.', (done) => {
      // Set `true` to check success pattern.
      isSuccess = true;

      callbackForSuccess = ({latitude, longitude}) => {
        expect(latitude).toEqual(DUMMY_LATITUDE);
        expect(longitude).toEqual(DUMMY_LONGITUDE);
        done();
      };

      getCurrentPosition({success: callbackForSuccess});
    });

    it('returns error object when gettingLocation failed.', (done) => {
      // Set `false` to check error pattern.
      isSuccess = false;

      callbackForError = (err) => {
        expect(err).toEqual(DUMMY_ERROR);
        done();
      };

      getCurrentPosition({error: callbackForError});
    });
  });

  describe('The watchPosition function', () => {
    let isSuccess = true;

    beforeAll(() => {
      navigator.geolocation = navigator.geolocation || {};
      navigator.geolocation.watchPosition
        = navigator.geolocation.watchPosition || function(success, error, options) {
          if(isSuccess) {
            const position = {
              latitude: DUMMY_LATITUDE,
              longitude: DUMMY_LONGITUDE
            };
            callbackForSuccess(position);
          } else {
            callbackForError(DUMMY_ERROR);
          }
        };
    });

    afterAll(() => {
      if(navigator.geolocation.watchPosition.mockRestore) {
        navigator.geolocation.watchPosition.mockRestore();
      }
    });

    it('returns location data when getting location succeeded.', (done) => {
      // Set `true` to check success pattern.
      isSuccess = true;

      callbackForSuccess = ({latitude, longitude}) => {
        expect(latitude).toEqual(DUMMY_LATITUDE);
        expect(longitude).toEqual(DUMMY_LONGITUDE);
        done();
      };

      watchPosition({success: callbackForSuccess});
    });

    it('returns error object when gettingLocation failed.', (done) => {
      // Set `false` to check error pattern.
      isSuccess = false;

      callbackForError = (err) => {
        expect(err).toEqual(DUMMY_ERROR);
        done();
      };

      watchPosition({error: callbackForError});
    });
  });
});