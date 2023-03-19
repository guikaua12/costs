const express = require('express');
const router = require('express').Router();

const UserController = require('../../database/controller/UserController');
const {parse} = require('../../database/util/jwt');
const {JsonWebTokenError} = require("jsonwebtoken");

const UserModel = require('../../database/model/User');

router.use(express.json());

router.post('/users', validateToken, UserController.get);

function validateToken(req, res, next) {
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(422).json({
            erro: true,
            msg: 'O token não foi informado.'
        });
    }

    // pego o token
    const token = authorization.split(' ')[1];
    try {
        // dou um parse nele usando o jwt.verify
        const {_id} = parse(token);
        // busco na db pelo id
        const user = UserModel.findById(_id);
        // se n tiver na db, o token é inválido
        if(!user) {
            return res.status(403).json({
                erro: true,
                msg: "Não autorizado."
            });
        }
        next();
    }catch(err) {
        if(err instanceof JsonWebTokenError) {
            return res.status(403).json({
                erro: true,
                msg: "Não autorizado."
            });
        }
    }
}



module.exports = router;