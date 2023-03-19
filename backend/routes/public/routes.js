const express = require('express');
const router = require('express').Router();

const UserController = require('../../database/controller/UserController');


router.use(express.json());

router.get('/', async (req, res) => {
    res.status(200).json({
        msg: 'Seja bem-vindo a nossa API!'
    })
});

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);



module.exports = router;