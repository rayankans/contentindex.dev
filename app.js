
const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

const api = require('./api/api.js');

app.use('/api', api);

if (app.get('env') === 'production') {
  app.get('/static/*', (req, res) => res.sendFile(path.join(__dirname, `client/build/${req.path}`)));
  app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'client/build/index.html')));
}

app.listen(port, () => console.log(`Listening on port ${port}! Mode: ${app.get('env')}`));
