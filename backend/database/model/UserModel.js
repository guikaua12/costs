const mongoose = require('mongoose');

const UserModel = mongoose.model('User', {
    email: {type: String, unique: true},
    password: String
});

module.exports = UserModel;