const express = require('express');
const router = express.Router();
//So this is the event handler function that we specify to execute when the req status is succesful


//Get all user tasks
const getAllTasks = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You can succesfully get all tasks from this route'
    });
};

//Create Tasks
const createTasks = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'You successfully created this task and route'
    });
};

//Get task by id
const getTaskId = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You successfully got the task by ID.'
    });
};

//Edit Task
const editTask = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You successfully edited the task by ID.'
    });
};

//Remove Task
const removeTask = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You successfully removed the task by ID.'
    });
};

//Get comment
const getComment = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You successfully retrieved a comment'
    });
};

//Mark as claimed
const markClaimed = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'You have successfully marked this task as claimed'
    });
};

//Add comment
const addComment = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'You have successfully added a comment'
    });
};

router
    .get('/', getAllTasks)
    .post('/', createTasks);


router
    .get('/:id', getTaskId)
    .put('/:id', editTask)
    .delete('/:id', removeTask)
    .get('/:id/comments', getComment)
    .post('/:id/comments', addComment);

router
    .get('/:id/claim', markClaimed);

module.exports = router;