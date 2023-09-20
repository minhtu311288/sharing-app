const loginRouter = require('./login');
const siteRouter = require('./site');
const registerRouter = require('./register');
const shareVideoRouter = require('./share-video');
function route(app) {
    app.use('/share-video', shareVideoRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/', siteRouter);
}
module.exports = route;
