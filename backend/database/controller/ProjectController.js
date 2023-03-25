const mongoose = require('mongoose');
const ProjectModel = require('../model/ProjectModel');
const {parse, getToken} = require('../util/jwt');

const categories = [
    {
        "id": 1,
        "name": "Infra"
    },
    {
        "id": 2,
        "name": "Desenvolvimento"
    },
    {
        "id": 3,
        "name": "Design"
    },
    {
        "id": 4,
        "name": "Planejamento"
    }
]


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
        let projects = await ProjectModel.find({owner: user._id});
        projects = projects.map(project => {
            return {
                ...project.toObject(),
                category: categories.find(cat => cat.id === project.category)
            };
        });

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

async function getOne(req, res) {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(422).json({
            erro: true,
            msg: 'O id é inválido.'
        });
    }

    try {
        const user = parse(getToken(req));
        let project = await ProjectModel.findById(id).where({owner: user._id});
        if(!project) {
            return res.status(404).json({
                erro: true,
                msg: 'Projeto não encontrado.'
            });
        }
        project = {
            ...project.toObject(),
            category: categories.find(cat => cat.id === project.category)
        };

        res.status(200).json({
            erro: false,
            project
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({
            erro: true,
            msg: 'Ocorreu um erro interno.'
        });
    }
}

async function getAllCategories(req, res) {
    try {
        res.status(200).json({
            erro: false,
            categories
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({
            erro: true,
            msg: 'Ocorreu um erro interno.'
        });
    }
}

async function updateOne(req, res) {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(422).json({
            erro: true,
            msg: 'O id é inválido.'
        });
    }

    const {name, budget, category} = req.body;
    if(!name || !budget || !category) {
        return res.status(422).json({
            erro: true,
            msg: 'O nome, budget e category não podem ser vazios.'
        });
    }
    if(typeof name !== 'string' || typeof budget !== 'number' || typeof category !== 'number') {
        return res.status(422).json({
            erro: true,
            msg: 'O nome, budget ou category são inválidos.'
        });
    }


    try {
        const project = await ProjectModel.findByIdAndUpdate(id, {name, budget, category}).where({owner: req.user._id});
        if(!project) {
            return res.status(404).json({
                erro: true,
                msg: 'Projeto não encontrado.'
            });
        }
        return res.status(200).json({
            erro: false,
            msg: 'Projeto atualizado com sucesso.'
        });
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            erro: true,
            msg: 'Ocorreu um erro interno.'
        });
    }
}

module.exports = {
    create,
    getAllByToken,
    getAllCategories,
    getOne,
    updateOne
}