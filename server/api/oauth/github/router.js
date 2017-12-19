import { Router } from 'express';
import passport from 'passport';
import GithubPassport from 'passport-github';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const GithubStrategy = GithubPassport.Strategy;

passport.use(new GithubStrategy({
    clientID: process.env.clientIDGithub,
    clientSecret: process.env.clientSecretGithub,
    callbackURL: 'http://localhost:9000/auth/github/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // if (err) {
    //   return done(err);
    // }
    done(null, profile);
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