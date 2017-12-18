module.exports = {
  'facebookAuth': {
    'clientID': '1723859427634595', // App ID
    'clientSecret': process.env.clientSecret, // App Secret
    'callbackURL': 'http://localhost:8080/auth/facebook/callback',
    'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
  },
};