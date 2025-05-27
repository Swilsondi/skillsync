require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());



const getAllTasks = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'You can succesfully get all tasks from this route'
    });
};


app.get('/api//v1/tasks', getAllTasks);



// ========== /////////// =========== //
// ========== Server Started ======== //

app.listen(PORT, () => {
    console.log(`Server started on port...${PORT}`);
})