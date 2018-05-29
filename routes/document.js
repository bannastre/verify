const express = require('express');
const DOB = require('../models/dob');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ status: 'OK', router: 'document' });
});

router.post('/', (req, res) => {
  const dob = new DOB(req.body.dateOfBirth);
  res.json({ dateOfBirth: dob.compile() });
});

module.exports = router;
