const mongoose = require('mongoose');

const UserModel = require('../model/User');
const {hash, match} = require('../util/password');
const {generateJwt, parse} = require('../util/jwt');

const EMAIL_PATTERN = new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+');

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

        await user.save();
        res.status(200).json({
            erro: false,
            msg: "Cadastro realizado com sucesso."
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

    const jwt = generateJwt({
        _id: user._id
    });

    res.status(200).json({
        erro: false,
        token: jwt
    });
}

async function get(req, res) {
    const {id} = req.body;

    if(!id) {
        return res.status(422).json({
            erro: true,
            msg: 'Especifique um id!'
        });
    }


    const user = await UserModel.findById(id, '-password').exec();

    if(!user) {
        return res.status(404).json({
            erro: true,
            msg: 'Id inexistente.'
        });
    }

    res.status(200).json({
        erro: false,
        msg: 'Usuário consultado com sucesso.',
        user
    });

}

async function emailExists(email) {
    return !!(await UserModel.findOne({email}).exec());
}
module.exports = {
    register,
    login,
    get,
    emailExists
}