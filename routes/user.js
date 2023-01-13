const express = require('express')
const UserController = require('../controllers/user')
const router = express.Router();

router.get('/getAllUser', UserController.findAll);
router.post('/addUser', UserController.create);
router.post('/loginUser', UserController.login);
router.get('/getSingleUser', UserController.findSingleUser);
router.get('/getSingleUserById/:id', UserController.findById);
router.put('/updateUserById/:id', UserController.updateUserById);
router.delete('/deleteUserById/:id', UserController.deleteUserById);

module.exports = router



