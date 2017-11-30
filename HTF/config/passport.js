var LocalStrategy   = require('passport-local').Strategy;
var fs = require("fs");
var content = fs.readFileSync("login.json");
var jsonContent = JSON.parse(content);
var request = require('request');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.code);
    });

    passport.deserializeUser(function(code, done) {
        authUser(code, function (user) {
            var curuser = {
                code: code,
                accessToken: user.accessToken
            };

            return done(null, curuser);
        });
    });

    passport.use('local-login', new LocalStrategy({
            usernameField : 'code',
            passwordField : 'code',
            passReqToCallback: true
        },
        function(req, code, code, done) {
            authUser(code, function (user) {
                if(user.message !== undefined){
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                var curuser = {
                    code: code,
                    accessToken: user.accessToken
                };

                return done(null, curuser);
            });
        }));
};

function authUser(qrCode, callback){
    request.post(
        'http://37.230.98.72/htf/api/auth/login',
        { json: { qrCode: qrCode } },
        function (error, response, body) {
            callback(body);
        }
    );
}