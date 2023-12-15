const moment = require('moment-timezone');

class Record {
  constructor(id, userId, categoryId, date, price) {
    this.id = id;
    this.userId = userId;
    this.categoryId = categoryId;
    this.date = this.setNewDate(date);
    this.price = price;
  }

  setNewDate = (date) => {
    const timeZone = 'Europe/Kiev';
    const dateWithTz = moment.tz(date, timeZone);

    return dateWithTz.format('YYYY-MM-DD HH:mm:ss');
  };
}

module.exports = Record;
