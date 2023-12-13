const express = require('express');

const healthCheckController = require('./controllers/healthCheckController');
const userController = require('./controllers/userController');

const router = express.Router();

router.get('/healthcheck', healthCheckController);

router.route('/users').get(userController.findAllUsers);

router.route('/user').post(userController.createNewUser);

router.route('/user/:id')
    .get(userController.findUserById)
    .delete(userController.deleteUserById);

module.exports = router;
