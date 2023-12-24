const express = require('express');

const healthCheckController = require('./controllers/healthCheckController');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const recordController = require('./controllers/recordController');
const accountController = require('./controllers/accountController');
const authenticateUser = require('./middlewares/authMiddleware');

const router = express.Router();

router.get('/healthcheck', healthCheckController);

router.route('/users').get(authenticateUser, userController.findAllUsers);

router.route('/login').post(userController.loginUser);

router.route('/user').post(userController.registerUser);

router.route('/user/:id')
    .get(authenticateUser, userController.findUserById)
    .delete(authenticateUser, userController.deleteUserById);

router.route('/user/:userId/account/edit')
    .put(accountController.addMoneyToAccount);

router.route('/user/:userId/account')
    .get(accountController.getAccountBalance);

router.route('/categories').get(categoryController.findAllCategories);

router.route('/category').post(categoryController.createCategory);

router.route('/category/:id')
    .get(categoryController.findCategoryById)
    .delete(categoryController.deleteCategoryById);

router.route('/records').get(recordController.findAllRecords);

router.route('/record')
    .post(recordController.createRecord)
    .get(recordController.findRecordsByUserOrCategory);

router.route('/record/:id')
    .get(recordController.findRecordById)
    .delete(recordController.deleteRecordById);

module.exports = router;
