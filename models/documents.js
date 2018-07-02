module.exports = class Document {
  constructor(doc) {
    this.name = doc.name;
    this.hash = this.constructor.encrypt(doc.payload);
  }

  static encrypt(payload) {
    return payload;
  }
};
