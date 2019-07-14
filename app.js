
const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

// API endpoint.
app.all('/api', (req, res) => res.send('Accessing API!'));
app.get('/static/*', (req, res) => res.sendFile(path.join(__dirname, `client/build/${req.path}`)));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'client/build/index.html')));

app.listen(port, () => console.log(`Listening on port ${port}! Mode: ${app.get('env')}`));
