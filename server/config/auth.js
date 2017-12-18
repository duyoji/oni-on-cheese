module.exports = {
  'facebookAuth': {
    'clientID': '1948552805410537', // your App ID
    'clientSecret': '56d322d1a31e944b0ba86b57983de257', // your App Secret
    'callbackURL': 'http://localhost:8080/auth/facebook/callback',
    'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
  },
};