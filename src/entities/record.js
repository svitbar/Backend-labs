class Record {
  constructor(id = 1, userId, categoryId, date, cost) {
    this.id = id;
    this.userId = userId;
    this.categoryId = categoryId;
    this.date = date;
    this.cost = cost;
  }
}

module.exports = Record;
