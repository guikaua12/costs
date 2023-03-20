const express = require('express');
const router = require('express').Router();

const UserController = require('../../database/controller/UserController');
const ProjectController = require('../../database/controller/ProjectController');
const {parse, isValidToken} = require('../../database/util/jwt');
const {JsonWebTokenError} = require("jsonwebtoken");
const UserModel = require('../../database/model/UserModel');

router.use(express.json());

router.post('/projects/new', validateToken, ProjectController.create);
router.get('/projects/all', validateToken, ProjectController.getAllByToken);


// use as middleware
function validateToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        if(!authorization) {
            return res.status(403).json({
                erro: true,
                msg: 'Não autorizado.'
            });
        }
        const token = authorization.split(' ')[1];
        if(!token || !isValidToken(token)) {
            return res.status(403).json({
                erro: true,
                msg: 'Não autorizado.'
            });
        }
        next();
    }catch(err) {
        console.log(err);

        return res.status(500).json({
            erro: true,
            msg: 'Ocorreu um erro interno'
        });
    }
}



module.exports = router;