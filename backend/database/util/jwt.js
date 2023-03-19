const jwt = require('jsonwebtoken');
const UserModel = require('../model/User');

function generateJwt(data) {
    return jwt.sign(data, process.env.JWT_SECRET);
}

function parse(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

function isValidToken(token) {
    try {
        // dou um parse nele usando o jwt.verify
        const {_id} = parse(token);
        if(!_id) return false;

        // busco na db pelo id
        // const user = UserModel.findById(_id);
        // if(!user) {
        //     return false;
        // }
    }catch(err) {
        return false;
    }
}

module.exports = {
    generateJwt,
    parse
}