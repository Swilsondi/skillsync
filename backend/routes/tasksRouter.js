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
  .post("/", tasksController.createTask); // POST create a new task

// Individual task routes
//This listens for a GET request at /api/v1/tasks (because in server.js you mounted it at /api/v1/tasks)
router
  .get("/:id", tasksController.getTaskId) // GET a task by ID
  .put("/:id", tasksController.editTask) // PUT update a task by ID
  .delete("/:id", tasksController.removeTask) // DELETE a task by ID
  .get("/:id/comments", tasksController.getComment) // GET comments for a task
  .post("/:id/comments", tasksController.addComment); // POST add a comment to a task

router.patch("/:id/claim", tasksController.markClaimed); // PATCH mark a task as claimed

module.exports = router;
