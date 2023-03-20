const mongoose = require('mongoose');
const ProjectModel = require('../model/ProjectModel');
const {parse, getToken} = require('../util/jwt');

const categories = {
    '1': {
        "id": 1,
        "name": "Infra"
    },
    '2': {
        "id": 2,
        "name": "Desenvolvimento"
    },
    '3': {
        "id": 3,
        "name": "Design"
    },
    '4': {
        "id": 4,
        "name": "Planejamento"
    }
}

async function create(req, res) {
    const {name, budget, category} = req.body;

    if(!name || !budget || !category) {
        return res.status(422).json({
            erro: true,
            msg: 'O name, budget e category não podem estar vazios.'
        });
    }
    if(typeof name !== 'string' || typeof budget !== 'number' || typeof category !== 'number') {
        return res.status(422).json({
            erro: true,
            msg: 'name, budget ou category são inválidos.'
        });
    }

    //save
    try {
        const ownerId = parse(getToken(req))._id;
        const project = new ProjectModel({
            owner: ownerId,
            name,
            budget,
            category
        });

        await project.save();
        res.status(200).json({
            erro: false,
            msg: "Projeto criado com sucesso."
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({
            erro: true,
            msg: 'Ocorreu um erro interno.'
        });
    }
}

async function getAllByToken(req, res) {
    try {
        const user = parse(getToken(req));
        const projects = await ProjectModel.find({owner: user._id});

        res.status(200).json({
            erro: false,
            projects
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({
            erro: true,
            msg: 'Ocorreu um erro interno.'
        });
    }
}

module.exports = {
    create,
    getAllByToken
}