const passport = require('passport');
const { validPassword } = require('../lib/passwordUtils');
const LocalStrategy = require('passport-local').Strategy;
const Users = require("../models/users")

const customFields = {
    usernameField: 'username',
    passwordField: 'password'
}

//Passport setup
const verifyCallback = (username, password, done) => {
    try {
        Users.findOne({ username: username })
            .then((user) => {
                if(!user) {
                    return done(null, false)
                }

                const isValid = validPassword(password, user.hash, user.salt)

                if(isValid) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
    } catch (error) {
        done(error)
    }
        
}
const strategy = new LocalStrategy(customFields, verifyCallback)


passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    Users.findById(userId)
    .then((user) => {
        done(null, user)
    })
    .catch(error => done(error))
})