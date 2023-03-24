const mongoose = require('mongoose');

const UserModel = require('../model/UserModel');
const {hash, match} = require('../util/password');
const {generateJwt, parse} = require('../util/jwt');
const userCache = require('../cache/userCache');

const EMAIL_PATTERN = new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+');

// public routes
async function register(req, res) {
    const {email, password} = req.body;

    if(!email) {
        return res.status(422).json({
            erro: true,
            msg: 'O e-mail não pode ser vazio.'
        });
    }
    if(!password) {
        return res.status(422).json({
            erro: true,
            msg: 'A senha não pode ser vazia.'
        });
    }

    // check if email or username exists
    if(await emailExists(email)) {
        return res.status(422).json({
            erro: true,
            msg: 'O e-mail já está em uso.'
        });
    }

    // check email pattern
    if(!EMAIL_PATTERN.test(email)) {
        return res.status(422).json({
            erro: true,
            msg: 'O e-mail é inválido.'
        });
    }

    //hash password
    const hashedPassword = await hash(password);

    //save
    try {
        const user = new UserModel({
            email,
            password: hashedPassword
        });
        const _id = user._id.toString();

        await user.save();

        const token = generateJwt({
            _id,
            email
        });
        userCache.set(_id, {_id, email, token});

        res.status(200).json({
            erro: false,
            msg: 'Cadastro realizado com sucesso.',
            token
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({
            erro: true,
            msg: 'Ocorreu um erro interno.'
        });
    }
}

async function login(req, res) {
    const {email, password} = req.body;

    if(!email) {
        return res.status(422).json({
            erro: true,
            msg: 'O e-mail não pode ser vazio.'
        });
    }
    if(!password) {
        return res.status(422).json({
            erro: true,
            msg: 'A senha não pode ser vazia.'
        });
    }

    const user = await UserModel.findOne({
        email
    }).exec();

    if(!user) {
        return res.status(422).json({
            erro: true,
            msg: 'Email ou senha incorretos.'
        });
    }

    if(!await match(password, user.password)) {

        return res.status(422).json({
            erro: true,
            msg: 'Email ou senha incorretos.'
        });
    }

    const _id = user._id.toString();

    let token = '';

    try {
        if(userCache.has(_id)) {
            token = userCache.get(_id).token;

            return res.status(200).json({
                erro: false,
                msg: 'Login realizado com sucesso.',
                token
            });
        }

        token = generateJwt({
            _id,
            email
        });

        userCache.set(_id, {_id, email, token});

        res.status(200).json({
            erro: false,
            msg: 'Login realizado com sucesso.',
            token
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({
            erro: true,
            msg: 'Ocorreu um erro interno.'
        });
    }
}

// private routes

async function emailExists(email) {
    return !!(await UserModel.findOne({email}).exec());
}
module.exports = {
    register,
    login,
    emailExists
}