const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.njz11ma.mongodb.net/?retryWrites=true&w=majority');
    const db = mongoose.connection;

    db.once('open', () => {
        console.log('Conexão com o DB foi feita com sucesso');
    }).on('error', (err) => {
        console.log(err);
    });

    return db;

}

module.exports = {
    connect
}