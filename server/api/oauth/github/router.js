import { Router } from 'express';
import passport from 'passport';
import GithubPassport from 'passport-github';

const router = Router();

const GithubStrategy = GithubPassport.Strategy;

passport.use(new GithubStrategy({
    clientID: '71a62caadcdfa8c0e5e1',
    clientSecret: process.env.clientSecretGithub,
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  }
));

router.get('/',
  passport.authenticate('github'),
);

router.get('/callback', 
passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

export default router;