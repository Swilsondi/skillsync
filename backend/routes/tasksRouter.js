const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
// This file defines all the routes for "tasks" and connects them to controller functions.

// Example of a simple route handler (for reference, not used below)
// const getAllTasks = (req, res) => { ... }

// Controller functions handle the actual logic for each route.
// You can swap out the inline handlers below for controller functions as you build them.

// ================= ROUTES =================

// Main collection routes (use controller logic for DB access)
router
  .get("/", tasksController.getAllTasks) // GET all tasks
  .post("/", tasksController.createTasks); // POST create a new task

// Individual task routes (currently using inline handlers, swap for controllers as you build them)
//This listens for a GET request at /api/v1/tasks (because in server.js you mounted it at /api/v1/tasks)
router
  .get("/:id", getTaskId) // GET a task by ID
  .put("/:id", editTask) // PUT update a task by ID
  .delete("/:id", removeTask) // DELETE a task by ID
  .get("/:id/comments", getComment) // GET comments for a task
  .post("/:id/comments", addComment); // POST add a comment to a task

router.patch("/:id/claim", markClaimed); // PATCH mark a task as claimed

module.exports = router;
