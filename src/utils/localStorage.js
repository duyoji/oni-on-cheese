const KEY_TYPES = {
  PREFIX: 'oni-on-cheese',
  USER_NAME: 'username'
};

const buildKey = (key) => {
  return `${KEY_TYPES.PREFIX}:${key}`;
};

const setUserName = (userName) => {
  // https://stackoverflow.com/questions/21159301/quotaexceedederror-dom-exception-22-an-attempt-was-made-to-add-something-to-st
  // When user is in private mode, Just ignore.
  // It only setItem, so we do not need to wrap `getItem` with `try/catch`.
  try {
    const key = buildKey(KEY_TYPES.USER_NAME);
    window.localStorage.setItem(key, userName);
  } catch (error) {
    // Error handling
  }
};

const getUserName = () => {
  const key = buildKey(KEY_TYPES.USER_NAME);
  return window.localStorage.getItem(key);
};

export { setUserName, getUserName };