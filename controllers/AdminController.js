const crypto = require('crypto');
const View = require('../views/base');
const {AdminModel, UserModel} = require('../models/user');
const {CollectionModel, ItemModel} = require('../models/nft');

module.exports = {
    name: "AdminController",
    login: async function (req, res, next) {
        let user = await AdminModel.findOne({});
        if (!user) {
            let newAdmin = new AdminModel({
                name: "admin",
                email: "admin@admin.com",
                password: crypto.createHash('md5').update("admin").digest('hex'),
                reset_flag: 2,  // 1: usable token,  2: unusable token
                reset_token: "",
                avatar: '/images/avatar.png',
            });
            await newAdmin.save();
        }
        if (req.session.login === 1) return res.redirect('/');
        let v = new View(res, 'pages/login');
        v.render({
            title: 'Audioburst | Login',
            session: req.session,
            i18n: res,
        })
    },
    forgotPassword: async function (req, res, next) {
        if (req.session.login === 1) return res.redirect('/');
        let v = new View(res, 'pages/forgot_password');
        v.render({
            title: 'Fox | Forgot password',
            session: req.session,
            i18n: res,
        })
    },
    resetPassword: async function (req, res, next) {
        if (req.session.login === 1) return res.redirect('/');
        let token = req.query.token;
        if (!token) return res.redirect('/404');
        let user = await AdminModel.findOne({reset_token: token});
        if (!user) return res.redirect('/404');
        req.session.user = user;
        let v = new View(res, 'auth/reset_password');
        v.render({
            title: 'Audioburst | Forgot password',
            session: req.session,
            i18n: res,
        })
    },
    logout: async function (req, res, next) {
        req.session.login = 0;
        req.session.user = null;
        return res.redirect('/admin-routes/login');
    },
    postLogin: async function (req, res, next) {
        let login_email = req.body.email;
        let login_password = req.body.password;
        login_email = login_email.toLowerCase().trim();
        let user = await AdminModel.findOne({email: login_email});
        if (!user) return res.send({status: 'error', message: 'Login info is invalid'});
        if (!user.verifyPassword(login_password)) return res.send({status: 'error', message: 'Password is not correct'});
        req.session.user = user;
        req.session.login = 1;
        return res.send({status: 'success', message: 'Login is success'});
    },
    dashboard: async function (req, res, next) {
        let user = await AdminModel.findOne({email: req.session.user.email});
        let contacts = await UserModel.find({});
        let v = new View(res, 'pages/dashboard');
        v.render({
            title: 'Audioburst | Dashboard',
            session: req.session,
            i18n: res,
            tab_text: 'dashboard',
            user: user,
            contacts: contacts,
        })
    },
    func_collections: async function (req, res, next) {
        let user = await AdminModel.findOne({email: req.session.user.email});
        let collections = await CollectionModel.find({});
        let v = new View(res, 'pages/collections');
        v.render({
            title: 'Audioburst | Collections',
            session: req.session,
            i18n: res,
            tab_text: 'collections',
            user: user,
            collections: collections,
        })
    },
    func_createCollection: async function (req, res, next) {
        let user = await AdminModel.findOne({email: req.session.user.email});
        if (req.method === 'post') {

        } else {
            let v = new View(res, 'pages/createCollection');
            v.render({
                title: 'Audioburst | Create Collection',
                session: req.session,
                i18n: res,
                tab_text: 'collections',
                user: user,
            })
        }
    },
    func_nfts: async function (req, res, next) {
        let user = await AdminModel.findOne({email: req.session.user.email});
        let items = await ItemModel.find({});
        let v = new View(res, 'pages/items');
        v.render({
            title: 'Audioburst | NFTs',
            session: req.session,
            i18n: res,
            tab_text: 'nfts',
            user: user,
            items: items,
        })
    },
    func_createNFT: async function (req, res, next) {
        let user = await AdminModel.findOne({email: req.session.user.email});
        if (req.method === 'post') {

        } else {
            let collections = await CollectionModel.find({});
            let v = new View(res, 'pages/createItem');
            v.render({
                title: 'Audioburst | Create NFT',
                session: req.session,
                i18n: res,
                tab_text: 'nfts',
                user: user,
                collections: collections,
            })
        }
    },
};
