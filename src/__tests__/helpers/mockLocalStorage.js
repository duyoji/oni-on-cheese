// This file is for tests that use window.localStorage.
// Thanks to this file, we can avoid errors such as `TypeError: Cannot read property 'getItem' of undefined`
window.localStorage = window.localStorage || {};
window.localStorage.setItem = window.localStorage.setItem || ((key, value) => {}); // eslint-disable-line no-unused-vars
window.localStorage.getItem = window.localStorage.getItem || ((key) => {}); // eslint-disable-line no-unused-vars