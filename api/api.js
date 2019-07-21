const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(403).send());

module.exports = router;
