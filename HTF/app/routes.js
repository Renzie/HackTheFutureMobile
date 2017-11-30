var request = require('request');
var path = require('path');

module.exports = function (app, passport) {
    app.get('/', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
        //authUser('91a3d65875df88e814ec7a0b40402845901000073c7c2e9ea29b474c06f0cdd0a18e13750f5b4a4ab4ed0d753c4dc5d79c7c46892d96');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/terrorists', isLoggedIn, function (req, res) {
        //TODO
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function authUser(qrCode){
    request.post(
        'http://37.230.98.72/htf/api/auth/login',
        { json: { qrCode: qrCode } },
        function (error, response, body) {
            if (!error && response.statusCode !== 400) {
                console.log(body);
            } else {
                console.log(body.message);
            }
        }
    );
}

function listTerrorists(accessToken){
    request.get(
        'http://37.230.98.72/htf/api/terrorists',
        { json: { Bearer: accessToken } },
        function (error, response, body) {
            if (!error && response.statusCode !== 400) {
                console.log(body);
            } else {
                console.log(body.message);
            }
        }
    );
}