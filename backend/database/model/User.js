const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: String,
    user: String,
    password: String
});

module.exports = User;