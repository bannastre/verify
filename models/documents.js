module.exports = class Document {
  constructor(name) {
    this.name = name;
    this.hash = '';
  }

  encrypt(data) {
    this.hash = data;
    return data;
  }
};
