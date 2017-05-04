const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');

const routes = require('./routes');
const auth = require('./auth');
const config = require('../../config');

const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const config = require('./config');
const session = require('express-session');

passport.use(new GithubStrategy({
  clientID: config.githubID,
  clientSecret: config.githubSecret,
  callbackURL: '/auth/github/callback' },
  (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
// ^^^^^^ this may be the place to check user in db ^^^^^

function ensureAuth(req, res, next) {
  console.log('Authenticated: ', req.isAuthenticated());
  console.log('Headers: ', req.headers);
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/github');
  return 'appease airbnb';
}

const port = process.env.PORT || 8080;
const app = express();

// configure passport to run on all requests
app.use(session({ secret: config.secret }));
app.use(passport.initialize());
app.use(passport.session());
// protect api routes
app.use('/api', auth.checkAuth);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));
app.use(routes);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
