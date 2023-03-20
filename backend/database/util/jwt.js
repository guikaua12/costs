const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');

function generateJwt(data) {
    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: 300});
}

function parse(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

function getToken(req) {
    return req.headers.authorization.split(' ')[1];
}

// function isValidToken(token) {
//     try {
//         // dou um parse nele usando o jwt.verify
//         const {_id} = parse(token);
//         if(!_id) return false;
//
//         // busco na db pelo id
//         // const user = UserModel.findById(_id);
//         // if(!user) {
//         //     return false;
//         // }
//     }catch(err) {
//         return false;
//     }
// }

module.exports = {
    generateJwt,
    parse,
    getToken
}