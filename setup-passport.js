var passport = require('passport')
var Auth0Strategy = require('passport-auth0')

var strategy = new Auth0Strategy({
        domain:       'oswaldosalazar.auth0.com',
        clientID:     '37EId2ZvkTLApPIGRNWERZxyx4Q7OY5q',
        clientSecret: 'YpXsThvglTzXvGUJ66BxRpJ0e95y7v5dC-ioac5ma7PG7YnQCOp218mtOQeluWaf',
        callbackURL:  '/callback'
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
