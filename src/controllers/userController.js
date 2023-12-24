const prisma = require('../../prisma/prisma');
const bcrypt = require('bcryptjs');
const jwtManager = require('../JWTManager');

const registerUser = async (req, res) => {
  const {name, password} = req.body;

  try {
    if (!name || !password) {
      return res.status(400).json({message: 'Bad request'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        account: {
          create: {
            balance: 0,
          },
        },
      },
      include: {
        account: true,
      },
    });

    const token = jwtManager.generateToken(newUser);

    return res.status(201).json({
      message: 'User was successfully created.',
      user: newUser,
      token,
    });
  } catch (error) {
    return res.status(400).json({message: 'Bad request'});
  }
};

const loginUser = async (req, res) => {
  const {name, password} = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {name},
    });

    console.log('User from database:', user);

    if (!user) {
      return res.status(401).json({message: 'User not found'});
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwtManager.generateToken(user);
      return res.status(200).json({token});
    } else {
      return res.status(401).json({message: 'Password mismatch'});
    }
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
      const userAccount = await prisma.account.findUnique({
        where: {userId: id},
      });

      if (userAccount) {
        await prisma.account.delete({
          where: {userId: id},
        });
      }

      const deletedUser = await prisma.user.delete({
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
    console.error(error);
    return res.status(400).json({message: 'Bad request'});
  }
};

module.exports = {
  registerUser,
  loginUser,
  findUserById,
  findAllUsers,
  deleteUserById,
};
