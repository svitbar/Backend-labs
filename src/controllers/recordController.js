const Record = require('../entities/record');
const records = require('../db/recordDb');

const createRecord = (req, res) => {
  const {userId, categoryId} = req.query;
  const {price} = req.body;
  const recordId = records.length + 1;

  const newRecord = new Record(
      recordId,
      userId,
      categoryId,
      new Date(),
      price,
  );

  records.push(newRecord);

  return res.status(201)
      .json({message: 'Record was successfully created.', record: newRecord});
};

const findRecordById = (req, res) => {
  const id = req.params.id;

  const found = records.find((record) => record.id === parseInt(id));

  if (found) return res.status(200).json(found);
  else return res.status(404).json({message: 'Not found'});
};

const findRecordsByUserOrCategory = (req, res) => {
  const {userId, categoryId} = req.query;

  if (!userId && !categoryId) {
    return res.status(400).json({message: 'Bad request'});
  }

  const filteredRecords = [];

  for (const record of records) {
    const defineUser = !userId || userId == record.userId;
    const defineCategory = !categoryId || categoryId == record.categoryId;

    if (defineUser && defineCategory) {
      filteredRecords.push(record);
    }
  }

  return res.status(200).json(filteredRecords);
};

const findAllRecords = (req, res) => {
  return res.status(200).json(records);
};

const deleteRecordById = (req, res) => {
  const id = req.params.id;

  const index = records.findIndex((record) => record.id === parseInt(id));

  if (index !== -1) {
    const deletedRecord = records.splice(index, 1)[0];

    return res.status(200).json({
      message: 'Record was successfully deleted.',
      record: deletedRecord,
    });
  } else {
    return res.status(404).json({message: 'Not found'});
  }
};

module.exports = {
  createRecord,
  findRecordById,
  findRecordsByUserOrCategory,
  findAllRecords,
  deleteRecordById,
};
