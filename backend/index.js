const express = require('express');
require('dotenv').config();

const { connect } = require('./database');
const publicRouter = require('./routes/public/routes');
const privateRouter = require('./routes/private/routes');

const app = express();
const db = connect();

app.use('/', publicRouter);
app.use('/', privateRouter);

const port = process.env.EXPRESS_PORT;
app.listen(port, () => {
    console.log("Servidor escutando na porta "+port);
});