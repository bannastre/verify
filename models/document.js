module.exports = class Document {
  constructor(doc) {
    this.doc = doc;
  }

  classify() {
    return this.doc.type;
  }
};
