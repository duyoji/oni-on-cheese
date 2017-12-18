import { Router } from 'express';
import passport from 'passport';
import FacebookPassport from 'passport-facebook';

const FacebookStrategy = FacebookPassport.Strategy;

passport.use(new FacebookStrategy({
    'clientID': '1723859427634595', // App ID
    'clientSecret': process.env.clientSecret, // App Secret
    'callbackURL': 'http://localhost:3000/auth/facebook/callback',
    'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
  },

  //facebook will send back the token and profile
  (accessToke, refreshToken, profile, done) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  })
));

router.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'profile']
  }),
);

app.get('/auth/facebook/callback', 
passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

export default router;