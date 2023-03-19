const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {type: String, unique: true},
    password: String
});

module.exports = User;