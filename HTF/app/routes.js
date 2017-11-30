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

    app.get('/terrorists', function (req, res) {
        getData('terrorists' ,req.user.accessToken, function (result) {
            res.send(result);
        });
    });

    app.get('/mines', function (req, res) {
        getData('mines' ,req.user.accessToken, function (result) {
            res.send(result);
        });
    });

    app.get('/mines/:id', function (req, res) {
        getData('mines/' + req.params.id ,req.user.accessToken, function (result) {
            res.send(result);
        });
    });

    app.get('/images', function (req, res) {
        getData('images/' ,req.user.accessToken, function (result) {
            res.send(result);
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        failureRedirect : '/',
        failureFlash : true
    }), function (req, res) {
        res.redirect('/index');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

function getData(dataset, accessToken, callback){
    request.get('http://37.230.98.72/htf/api/' + dataset,
        { 'auth': {'bearer':accessToken} },
        function (error, response, body) {
            callback(body);
        }
    );
}