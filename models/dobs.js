/* eslint-disable prefer-destructuring */

module.exports = class DOB {
  constructor(dateofBirth) {
    this.day = dateofBirth.split('.')[0];
    this.month = dateofBirth.split('.')[1];
    this.year = dateofBirth.split('.')[2];
  }

  compile() {
    return `${this.day}.${this.month}.${this.year}`;
  }
};
