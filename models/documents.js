const bcrypt = require('bcrypt');
const logger = require('../helpers/logging');

module.exports = class Document {
  constructor(doc) {
    this.name = doc.name;
    this.hash = () => bcrypt.hash(JSON.stringify(doc.data), 10)
      .catch(err => logger.error(err.message));
  }
};
