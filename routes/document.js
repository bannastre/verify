const express = require('express');
const logger = require('../helpers/logging');
const queries = require('../db/queries');
const Document = require('../models/documents');

const router = express.Router();

router.get('/', async (req, res) => {
  const document = await queries.documentsRead()
    .catch(err => logger.error(err.message));
  res.status(200).send(document);
});

router.get('/:id', async (req, res) => {
  const document = await queries.documentsReadById(req.params.id)
    .catch(err => logger.error(err.message));
  res.status(200).send(document);
});

router.post('/', async (req, res) => {
  const document = new Document(req.body);
  const documentId = await queries.documentsCreate(document)
    .catch(err => logger.error(err.message));
  res.redirect(`/documents/${documentId[0]}`);
});

router.patch('/:id', async (req, res) => {
  const rowsUpdated = await queries.documentsUpdate(req.params.id, req.body)
    .catch(err => logger.error(err.message));
  res.status(200).send({ rowsUpdated });
});

router.delete('/:id', async (req, res) => {
  const rowsUpdated = await queries.documentsDelete(req.params.id)
    .catch(err => logger.error(err.message));
  res.status(200).send({ rowsUpdated });
});

module.exports = router;
