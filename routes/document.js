const express = require('express');
const Document = require('../models/documents');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // const document = queries.documentCreate
  res.status(200).json({ status: 'OK' });
});

router.post('/', (req, res) => {
  const document = new Document(req.body.name);
  // queries.documentCreate(document)
  res.status(200).json(document.encrypt(req.body.payload));
});

router.patch('/', (req, res) => {
  // const document = queries.documentUpdate
  res.status(200).json({ dob: req.body });
});

router.delete('/', (req, res) => {
  // const document = queries.documentDelete
  res.status(200).json({ dob: req.body });
});

module.exports = router;
