
require('dotenv/config');
var md5 = require('md5');
const Users = require('../models/User');

class RegisterController {
    post(req, res, next) {
        if (req && req.body) {
            let user = new Users(req.body);
            user.password = md5(user.password);
            user.save()
                .then(data => {
                    res.json({ success: true, data });
                })
                .catch(next);
        }
    }
}
module.exports = new RegisterController();