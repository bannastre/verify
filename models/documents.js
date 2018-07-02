const bcrypt = require('bcrypt');

module.exports = class Document {
  constructor(doc) {
    this.name = doc.name;
    this.hash = bcrypt.hashSync(JSON.stringify(doc.data), 10);
  }
};
