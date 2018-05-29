const express = require('express');
const Document = require('../models/document');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ status: 'OK', router: 'document' });
});

router.post('/', (req, res) => {
  if (!req.body.type) {
    res.status(400).json({ message: 'Document Type must be Supplied' });
  }
  const document = new Document(req.body);
  res.json(document.classify());
});

module.exports = router;
