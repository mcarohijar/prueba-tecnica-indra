const serverless = require('serverless-http')
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json({strict: false}));
require('./src/routes/index.js')(app);

module.exports.handler = serverless(app);
module.exports.app = app;