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

    app.get('/terrorists', isLoggedIn, function (req, res) {
        //TODO
    });

    app.post('/login', passport.authenticate('local-login', {
        failureRedirect : '/',
        failureFlash : true
    }), function (req, res) {
        listTerrorists(req.user.accessToken);
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

function listTerrorists(accessToken){
    request.get('http://37.230.98.72/htf/api/terrorists',
        { 'auth': {'bearer':accessToken} },
        function (error, response, body) {
            if (!error && response.statusCode !== 400) {
                console.log(body);
            } else {
                console.log(body.message);
            }
        }
    );
}