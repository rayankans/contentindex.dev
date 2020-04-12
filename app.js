
const express = require('express');
const path = require('path');

const app = express();
const port = 6001;

const api = require('./api/api.js');
const { dailyPush } = require('./api/daily_push.js');

app.use('/api', api);

if (app.get('env') === 'production') {
  app.use(express.static('client/build'));
  app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'client/build/index.html')));
}

app.listen(port, () => console.log(`Listening on port ${port}! Mode: ${app.get('env')}`));

// Set up cron job for push notifications.
const CronJob = require('cron').CronJob;

new CronJob('0 0 19 * * *', () => dailyPush(), null, true, 'GMT');
