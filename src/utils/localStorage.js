const KEY_TYPES = {
  PREFIX: 'oni-on-cheese',
  USER_NAME: 'username'
};

const buildKey = (key) => {
  return `${KEY_TYPES.PREFIX}:${key}`;
};

const setUserName = (userName) => {
  const key = buildKey(KEY_TYPES.USER_NAME);
  window.localStorage.setItem(key, userName);
};

const getUserName = () => {
  const key = buildKey(KEY_TYPES.USER_NAME);
  return window.localStorage.getItem(key);
};

export { setUserName, getUserName };