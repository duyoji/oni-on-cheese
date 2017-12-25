import sinon from 'sinon';
import { setUserName, getUserName } from '../../utils/localStorage';

const mockLocalStorage = {};

describe('src/utils/localStorage.js', () => {
  beforeAll(() => {
    window.localStorage = window.localStorage || {};
    window.localStorage.setItem = window.localStorage.setItem || ((key, value) => {});
    window.localStorage.getItem = window.localStorage.getItem || ((key) => {});
  });

  describe('The setUserName function', () => {
    let setKey = '';
    let setValue = '';
    beforeAll(() => {
      sinon.stub(window.localStorage, 'setItem').callsFake((key, value) => {
        setKey = key;
        setValue = value;
        mockLocalStorage[key] = value;
      });
    });

    afterAll(() => {
      window.localStorage.setItem.restore();
    });


    it('sets userName with specific key', () => {
      const userName = 'DUMMY_NAME';
      setUserName(userName);
      expect(setKey).toEqual('oni-on-cheese:username');
      expect(setValue).toEqual(userName);
    });
  });

  describe('The getUserName function', () => {
    let setKey = '';
    beforeAll(() => {
      sinon.stub(window.localStorage, 'getItem').callsFake((key) => {
        setKey = key;

        return mockLocalStorage[key];
      });
    });

    afterAll(() => {
      window.localStorage.getItem.restore();
    });

    it('gets userName in localStorage.', () => {
      const userName = getUserName();
      expect(setKey).toEqual('oni-on-cheese:username');
      expect(userName).toEqual(mockLocalStorage[setKey]);
    });
  });
});