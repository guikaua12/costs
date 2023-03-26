const express = require('express');
const router = require('express').Router();
const ProjectController = require('../../database/controller/ProjectController');
const {parse, isValidToken} = require('../../database/util/jwt');

router.use(express.json());

router.post('/projects/new', validateToken, ProjectController.create);
router.get('/projects/all', validateToken, ProjectController.getAllByToken);
router.get('/projects/categories', validateToken, ProjectController.getAllCategories);
router.get('/projects/:id', validateToken, ProjectController.getOne);
router.patch('/projects/:id', validateToken, ProjectController.updateOne);
router.post('/projects/:id/services/new', validateToken, ProjectController.addService);
router.delete('/projects/:id', validateToken, ProjectController.deleteProject);
// router.get('/projects/:id/services/:serviceId', validateToken, ProjectController.updateOne);

// token
router.get('/auth/validatetoken', validateToken, (req, res) => res.status(200).json({erro: false}));


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
        req.token = token;
        req.user = parse(token);
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