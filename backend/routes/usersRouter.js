const express = require('express');
const router = express.Router();

//Get users
const getUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You can get users from this route'
    });
};

//Create User
const createUser = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'You have successfully created a user'
    })
};

//Get user by ID
const userId = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'You have successfully found user by id'
    });
};


//Edit user by ID
const editUser = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'You have successfully edited user'
    })
}


// Delete User
const deleteUser = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'You have successfully deleted user'
    })
}


router
    .get('/', getUser)
    .post('/', createUser)

router
    .get('/:id', userId)
    .put('/:id', editUser)
    .delete('/:id', deleteUser);


module.exports = router;