const prisma = require('../../prisma/prisma');

const createNewUser = async (req, res) => {
  const {name} = req.body;

  try {
    if (name === '') {
      return res.status(400).json({message: 'Bad request'});
    }

    const newUser = await prisma.user.create({
      data: {name},
    });

    return res.status(201).json({
      message: 'User was successfully created.',
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({message: 'Bad request'});
  }
};

const findUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const foundUser = await prisma.user.findUnique({
      where: {id},
    });

    if (foundUser) {
      return res.status(200).json(foundUser);
    } else {
      return res.status(404).json({message: 'Not found'});
    }
  } catch (error) {
    return res.status(400).json({message: 'Bad request'});
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

const deleteUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const isUser = await prisma.user.findUnique({
      where: {id},
    });

    if (isUser) {
      const deletedUser = await prisma.user.findUnique({
        where: {id},
      });

      return res.status(200).json({
        message: 'User was successfully deleted.',
        user: deletedUser,
      });
    } else {
      return res.status(404).json({message: 'Not found'});
    }
  } catch (error) {
    return res.status(400).json({message: 'Bad request'});
  }
};

module.exports = {
  createNewUser,
  findUserById,
  findAllUsers,
  deleteUserById,
};
