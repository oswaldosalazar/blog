var passport = require('passport')
var Auth0Strategy = require('passport-auth0')
var dotenv = require('dotenv')

dotenv.load() // Very important. Used to load env values.

var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
}, function(accessTocken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web token
    // profile has all the information from the user
    return done(null, profile)
})

passport.use(strategy)

// This is not a best practice, but we want to keet things simple for now
passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})

module.exports = strategy
