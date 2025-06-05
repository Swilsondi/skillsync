const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');


router
    .get('/', userController.getAllUsers)
    .post('/', userController.createUser)

router
    .get('/:id', userController.userId)
    .put('/:id', userController.editUser)
    .delete('/:id', userController.deleteUser);


module.exports = router;