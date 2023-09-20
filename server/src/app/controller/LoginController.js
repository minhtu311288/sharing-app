
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv/config');
require("../services/LoginService")(passport);
const catchAsync = require("../../utils/catchAsync");

class LoginController {
    // POST login
    login = catchAsync(async (req, res, next) => {
        passport.authenticate('local', function (err, user) {
            const token = jwt.sign(req.body.email, process.env.TOKEN_SECRET);
            return res.send({ success: true, message: 'authentication succeeded', email: req.body.email, token });
            // if (err) return next(err); // will generate a 500 error
            // if (!user) return res.send({ success: false, message: 'authentication failed' });
            // req.login(user, loginErr => {
            //     if (loginErr) {
            //         return next(loginErr);
            //     }
            //     const token = jwt.sign(user.email, process.env.TOKEN_SECRET);
            //     res.cookie('jwt', token, {
            //         signed: false
            //     });
            //     return res.send({ success: true, message: 'authentication succeeded', email: user.email, token });
            // });
        })(req, res, next);
    })
}
module.exports = new LoginController;