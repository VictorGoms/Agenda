const { async } = require('regenerator-runtime');
const Login = require('../models/LoginModel');
exports.index = (req, res) => {
    res.render('login');
    return;
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.error.length > 0) {
            req.flash('error', login.error);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }
        req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(function () {
            return res.redirect('/login/index');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }



};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.error.length > 0) {
            req.flash('error', login.error);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }

        
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }



};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
}