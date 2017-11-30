var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local            : {
        name        : String,
        family     : String
    }
});

module.exports = mongoose.model('User', userSchema);