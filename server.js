require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
//Database integration
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Swilsondi:<db_password>@cluster0.yshmqtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
// (Routers will be mounted after DB connection below)

//Middleware  for errors
// (Error middleware will be mounted after DB connection below)

// ========== /////////// =========== //
// ========== Server Started ======== //

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function startServer() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(process.env.DB_NAME).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Make the db accessible in controllers via req.app.locals.db
    app.locals.db = client.db(process.env.DB_NAME);

    // Mount routers at their base paths
    app.use('/api/v1/tasks', taskRouter);
    app.use('/api/v1/users', userRouter);

    //Middleware  for errors
    app.use(notFound);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server started on port...${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

startServer();