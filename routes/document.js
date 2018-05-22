const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ status: 'OK', router: 'document' });
});

module.exports = router;
