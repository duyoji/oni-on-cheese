//load the auth variables
const configAuth = require('./auth');

module.exports = (passport) => {

  //used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //used to deserialize th euser
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, unser) => {
      done(err, user);
    });
  });
}

/*
============================================
   FACEBOOK
============================================
*/

passport.use(new FacebookStrategy({

    //pull in app id and secret from auth.js file
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },

//facebook will send back the token and profile
  (accessToke, refreshToken, profile, done) => {
    process.nextTick(() => {
      return done(null, user);
    });
  }
));