const express = require('express');

const healthCheckController = require('./controllers/healthCheckController');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');

const router = express.Router();

router.get('/healthcheck', healthCheckController);

router.route('/users').get(userController.findAllUsers);

router.route('/user').post(userController.createNewUser);

router.route('/user/:id')
    .get(userController.findUserById)
    .delete(userController.deleteUserById);

router.route('/categories').get(categoryController.findAllCategories);

router.route('/category').post(categoryController.createCategory);

router.route('/category/:id')
    .get(categoryController.findCategoryById)
    .delete(categoryController.deleteCategoryById);

module.exports = router;
