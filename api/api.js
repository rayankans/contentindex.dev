const express = require('express');
const bodyParser = require('body-parser');

const { getContent } = require('./get_content.js');
const { saveSubscription, deleteSubscription } = require('./subscription_manager.js');

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
  try {
    await saveSubscription(req.body);
    res.send(JSON.stringify({ data: { success: true } }));
  } catch (e) {
    res.status(501).send({ data: { success: false, error: e.message } });
  }
});

router.post('/delete_subscription', jsonParser, async (req, res) => {
  try {
    await deleteSubscription(req.body);
    res.send(JSON.stringify({ data: { success: true } }));
  } catch (e) {
    res.status(501).send({ data: { success: false, error: e.message } });
  }
});

module.exports = router;
