const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');
const userCache = require('../cache/userCache');

function generateJwt(data) {
    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: 300});
}

function parse(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

function getToken(req) {
    return req.headers.authorization.split(' ')[1];
}

function isValidToken(token) {
    try {
        const {_id} = parse(token);
        if(!_id) return false;

        return userCache.has(_id);
    }catch(err) {
        return false;
    }
}

module.exports = {
    generateJwt,
    parse,
    getToken,
    isValidToken
}