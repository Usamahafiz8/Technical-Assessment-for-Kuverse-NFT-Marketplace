const config = require('../config')();
let BaseController = require('./BaseController.js');
const {UserModel} = require('../models/user');

module.exports = BaseController.extend({
    name: 'MiddlewareController',
    m_checkLogin: function (req, res, next) {
        if (req.session.login === 1 && req.session.user) next();
        else {
            req.session.login = 0;
            req.session.user = null;
            res.redirect('/admin-routes/login');
        }
    },
    m_checkLoginPost: function (req, res, next) {
        if (req.session.login === 1 && req.session.user) next();
        else {
            req.session.login = 0;
            req.session.user = null;
            res.send({status: 'error', message: res.cookie().__('You are not logged in')});
        }
    },
});
