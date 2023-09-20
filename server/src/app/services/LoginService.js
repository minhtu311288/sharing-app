const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
var md5 = require('md5');
module.exports = function (passport) {
    passport.use(new LocalStrategy(
        function verify(email, password, done) {
            let passwordEncrypt = md5(password);
            User.findOne({ email, password: passwordEncrypt }, function (err, user) {
                console.log(user);
                if (err) return done(err);
                if (!user) return done(null, false);
                return done(null, user);
            });
        }
    ));
}
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});