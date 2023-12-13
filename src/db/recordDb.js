const Record = require('../entities/record');

const records = [
  new Record(1, 1, 1, new Date(), 100),
  new Record(2, 2, 3, new Date(), 200),
  new Record(3, 3, 2, new Date(), 300),
];

module.exports = records;
