const express = require('express');
const bodyParser = require('body-parser');

const { getContent } = require('./get_content.js');
const { saveSubscription } = require('./subscription_manager.js')

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
  try {
    res.json(await getContent());
  } catch (e) {
    res.status(501).send(e.message);
  }
});

router.post('/save_subscription', jsonParser, async (req, res) => {
  await saveSubscription(req.body);
  res.send(JSON.stringify({ data: { success: true } }));
});

module.exports = router;
