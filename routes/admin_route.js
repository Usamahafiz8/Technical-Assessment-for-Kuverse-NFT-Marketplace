let express = require('express');
let router = express.Router();

let admin_controller = require('../controllers/AdminController');
let middleware_controller = require('../controllers/MiddlewareController');
// let admin_api = require('../controllers/AdminApis');

router.get('/', function (req, res, next) {
    res.redirect('/admin-routes/login')
});
router.get('/login', function (req, res, next) {
    admin_controller.login(req, res, next);
});
router.post('/login', function (req, res, next) {
    admin_controller.postLogin(req, res, next);
});

router.get('/reset-password', function (req, res, next) {
    admin_controller.resetPassword(req, res, next);
});
router.get('/forgot-password', function (req, res, next) {
    admin_controller.forgotPassword(req, res, next);
});
router.get('/logout', function (req, res, next) {
    admin_controller.logout(req, res, next);
});

router.get('/home', middleware_controller.m_checkLogin, function (req, res, next) {
    admin_controller.dashboard(req, res, next);
});
router.get('/categories', middleware_controller.m_checkLogin, function (req, res, next) {
    admin_controller.func_categories(req, res, next);
});
router.post('/category-update', middleware_controller.m_checkLogin, function (req, res, next) {
    admin_controller.func_updateCategories(req, res, next);
});
router.get('/collections', middleware_controller.m_checkLogin, function (req, res, next) {
    admin_controller.func_collections(req, res, next);
});
router.get('/nfts', middleware_controller.m_checkLogin, function (req, res, next) {
    admin_controller.func_nfts(req, res, next);
});

module.exports = router;
