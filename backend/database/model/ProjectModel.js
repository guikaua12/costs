const mongoose = require('mongoose');

const ProjectModel = mongoose.model('Project', {
    owner: String,
    name: String,
    budget: Number,
    category: Number,
    services: Object
});

module.exports = ProjectModel;