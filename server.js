require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;

const notFound = require('./backend/middleware/notFound');
const errorHandler = require('./backend/middleware/errorHandler');

//Need to require the files to use them in this variable and them pass them to the middleware
const taskRouter = require('./backend/routes/tasksRouter.js');
const userRouter = require('./backend/routes/usersRouter.js');

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

//Middlewarwe to route the requests to the router files
// Mount routers at their base paths
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/users', userRouter);

//Middleware  for errors
app.use(notFound);
app.use(errorHandler);

// ========== /////////// =========== //
// ========== Server Started ======== //

app.listen(PORT, () => {
    console.log(`Server started on port...${PORT}`);
})

