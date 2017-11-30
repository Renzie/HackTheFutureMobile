var path = require('path');
var request = require('request');

module.exports = function (app, passport) {
    app.get('/', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/index', isLoggedIn, function (req, res) {
        res.render('index.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        failureRedirect : '/',
        failureFlash : true
    }), function (req, res) {
        res.redirect('/index');
    });

    app.post('/terrorists', function (req, res) {
        listTerrorists(req.user.accessToken, function (result) {
            res.send(result);
        });
    })
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

function listTerrorists(accessToken, callback){
    request.get('http://37.230.98.72/htf/api/terrorists',
        { 'auth': {'bearer':accessToken} },
        function (error, response, body) {
            callback(body);
        }
    );
}