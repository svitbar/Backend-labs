const prisma = require('../../prisma/prisma');

const createRecord = async (req, res) => {
  const {userId, categoryId} = req.query;
  const {price} = req.body;

  try {
    if (price < 0 || price === null) {
      return res.status(400).json({message: 'Bad request'});
    }

    const newRecord = await prisma.record.create({
      data: {
        userId: parseInt(userId),
        categoryId: parseInt(categoryId),
        date: new Date(),
        price: parseFloat(price),
      },
    });

    return res.status(201).json({
      message: 'User was successfully created.',
      record: newRecord,
    });
  } catch (error) {
    return res.status(400).json({message: 'Bad request'});
  }
};

const findRecordById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const foundRecord = await prisma.record.findUnique({
      where: {id},
    });

    if (foundRecord) {
      return res.status(200).json(foundRecord);
    } else {
      return res.status(404).json({message: 'Not found'});
    }
  } catch (error) {
    return res.status(400).json({message: 'Bad request'});
  }
};

const findRecordsByUserOrCategory = async (req, res) => {
  const {userId, categoryId} = req.query;

  if (!userId && !categoryId) {
    return res.status(400).json({message: 'Bad request'});
  }

  try {
    const filteredRecords = await prisma.record.findMany({
      where: {
        userId: userId ? parseInt(userId) : undefined,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
      },
    });

    return res.status(200).json(filteredRecords);
  } catch (error) {
    return res.status(400).json({message: 'Bad request'});
  }
};

const findAllRecords = async (req, res) => {
  try {
    const records = await prisma.record.findMany();
    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

const deleteRecordById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const isRecord = await prisma.record.findUnique({
      where: {id},
    });

    if (isRecord) {
      const deletedRecord = await prisma.record.delete({
        where: {id},
      });

      return res.status(200).json({
        message: 'Record was successfully deleted.',
        record: deletedRecord,
      });
    } else {
      return res.status(404).json({message: 'Not found'});
    }
  } catch (error) {
    return res.status(400).json({message: 'Bad request'});
  }
};

module.exports = {
  createRecord,
  findRecordById,
  findRecordsByUserOrCategory,
  findAllRecords,
  deleteRecordById,
};
