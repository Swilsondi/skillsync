require("dotenv").config(); // Loads values from .env file (like DB name and password).
const express = require("express"); // Brings in Express (web server).
const PORT = process.env.PORT || 3000; // Defines the port to listen on.
//Database integration
const mongoose = require("mongoose");

//Middleware these handle errors like 404 or 500.
const notFound = require("./backend/middleware/notFound");
const errorHandler = require("./backend/middleware/errorHandler");

//Need to require the files to use them in this variable and them pass them to the middleware
const taskRouter = require("./backend/routes/tasksRouter.js"); //These handle task and user-related routes.
const userRouter = require("./backend/routes/usersRouter.js"); //These handle task and user-related routes.

// Initialize Express app
const app = express(); //This allows Express to read req.body (from POST/PUT requests).

// Middleware to parse incoming JSON
app.use(express.json());

//Middlewarwe to route the requests to the router files
// Mount routers at their base paths
// (Routers will be mounted after DB connection below)

//Middleware  for errors
// (Error middleware will be mounted after DB connection below)

// ========== /////////// =========== //
// ========== Server Starting ======== //

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function startServer() {
  // Why async? Because connecting to MongoDB is not instant. It takes time, and we don’t want the app to move forward until it’s ready.
  try {
    // Connect the client to the server. Connects to your MongoDB database.
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("You successfully connected to Mongoose!");
    // Mount routers at their base paths. Attaches the routers so any request to /api/v1/tasks is handled by the tasksRouter.js file.
    app.use("/api/v1/tasks", taskRouter);
    app.use("/api/v1/users", userRouter);

    //Middleware  for errors
    app.use(notFound);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server started on port...${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to Mongoose", err);
    process.exit(1);
  }
}

startServer();

// async function startServer() {
//   try {
//     await client.connect();                          // ⏳ Try to connect to DB
//     await client.db(...).command({ ping: 1 });       // ✅ Confirm it's working
//     app.locals.db = client.db(...);                  // 🧠 Save DB to use later
//     app.use('/api/v1/tasks', taskRouter);            // 🔌 Use routers
//     app.use(notFound);                               // ⚠️ 404 handler
//     app.use(errorHandler);                           // 💥 General error handler
//     app.listen(PORT, ...)                            // 🚀 Start server
//   } catch (err) {
//     console.error("Failed to connect to MongoDB", err);  // ❌ If anything failed...
//     process.exit(1);                                     // 💀 Kill the app
//   }
// }
