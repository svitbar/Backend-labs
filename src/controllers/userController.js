const User = require('../entities/user');
const users = require('../db/userDb');

const createNewUser = (req, res) => {
  const {name} = req.body;
  const userId = users.length + 1;

  const newUser = new User(userId, name);

  users.push(newUser);

  return res.status(201)
      .json({message: 'User was successfully created.', user: newUser});
};

const findUserById = (req, res) => {
  const id = req.params.id;

  const found = users.find((user) => user.id === parseInt(id));

  if (found) return res.status(200).json(found);
  else return res.status(404).json({message: 'Not found'});
};

const findAllUsers = (req, res) => {
  return res.status(200).json(users);
};

const deleteUserById = (req, res) => {
  const id = req.params.id;

  const index = users.findIndex((user) => user.id === parseInt(id));

  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];

    return res.status(201)
        .json({message: 'User was successfully deleted.', user: deletedUser});
  } else {
    return res.status(404).json({message: 'Not found'});
  }
};

module.exports = {
  createNewUser,
  findUserById,
  findAllUsers,
  deleteUserById,
};
