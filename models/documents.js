const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const logger = require('../helpers/logging');

module.exports = class Document {
  constructor(doc) {
    this.name = doc.name;
    this.hash = bcrypt.hashSync(JSON.stringify(doc.data), 10);
    this.documentId = uuid();
  }

  verify(doc) {
    try {
      logger.debug({ message: `verifying doc against: ${this.name}` });
      return bcrypt.compareSync(JSON.stringify(doc.data), this.hash);
    } catch (err) {
      logger.error(JSON.stringify(err));
      throw err;
    }
  }
};
