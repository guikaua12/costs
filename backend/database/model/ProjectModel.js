const mongoose = require('mongoose');

const ProjectModel = mongoose.model('Project', {
    owner: String,
    name: String,
    budget: Number,
    category: Number,
    services: [{ name: String, cost: Number, description: String }],
    cost: Number
});

module.exports = ProjectModel;