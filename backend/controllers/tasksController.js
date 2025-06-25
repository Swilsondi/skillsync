const tasks = require("../models/taskModels");
// Get all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await db.collection("tasks").find().toArray(); // Fetches all the resource tasks in the db collection. We find the task the user is searching and then converts the cursor into an array so we can manipulate and use it.
    const transformedTasks = tasks.map((task) => ({
      // We are then using this map method to return a new object wwith the updated user task content.
      title: task.title,
      isClaimed: task.isClaimed,
      assignedTo: task.assignedTo || "Unassigned",
    }));
    res.status(200).json({
      // We send the response back if our try block executes succesfully. Along with the variable we set earlier to return the new tasks.
      status: "success",
      data: tasks,
      transformed: transformedTasks,
    });
  } catch (err) {
    // If anything in the try block fails then execute this peace of code.
    next(err);
  }
};

// Create a task
exports.createTasks = async (req, res, next) => {
  try {
    const result = await db.collection("tasks").insertOne(req.body);
    res.status(201).json({ status: "success", data: result.ops });
  } catch (err) {
    next(err);
  }
};

// Get task by id
exports.getTaskId = async (req, res, next) => {
  try {
    const results = await db.collection("tasks").findById({ _id: id });
    if (!results) {
      res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "You successfully got the task by ID.",
      tasks: results,
    });
  } catch (err) {
    next(err);
  }
};

// Edit Task
exports.editTask = async (req, res, next) => {
  try {
    const results = await db
      .collection("tasks")
      .findByIdAndUpdate({ _id: id }, { $set: req.body });
    if (results.matchedCount === 0) {
      res.status(404).json({
        status: "fail",
        message: "Resource not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "You successfully edited the task by ID.",
      matchedCount: results.matchedCount,
      modifiedCount: results.modifiedCount,
    });
  } catch (err) {
    next(err);
  }
};

// Remove Task
exports.removeTask = async (req, res, next) => {
  try {
    const result = await db.collection("tasks").findByIdAndDelete({ _id: id });
    if (result.deletedCount === 0) {
      res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "You successfully removed the task by ID.",
      data: [
        {
          deletedCount: result.deletedCount,
        },
      ],
    });
  } catch (err) {
    next(err);
  }
};

// Get comment
exports.getComment = async (req, res, next) => {
  try {
    const result = await db.collection("tasks").findbyId({ _id: id });
    if (!result.comment) {
      res.status(400).json({
        status: "fail",
        message: "Comment is not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "You successfully retrieved a comment",
      data: result.comment,
    });
  } catch (err) {
    next(err);
  }
};

// Mark as claimed
exports.markClaimed = async (req, res, next) => {
  try {
    const result = await db.collection("tasks").findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          isClaimed: true,
          claimedAt: new Date(),
          assignedTo: req.userId,
        },
      }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({
        status: "fail",
        message: "Task not found",
        data: result,
      });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "You have successfully marked this task as claimed",
      data: [
        { modifiedCount: result.modifiedCount },
        { matchedCount: result.matchedCount },
      ],
    });
  } catch (err) {
    next(err);
  }
};

// Add comment
exports.addComment = async (req, res, next) => {
  try {
    const { text, author, title, assignedTo } = req.body;
    const results = await db.collection("tasks").findByIdAndUpdate(
      { _id: id }, // this is the filter
      {
        $set: { title, assignedTo },
        $push: {
          comments: {
            text,
            author,
            createdAt: new Date(),
          },
        },
      }
    );
    if (results.matchedCount === 0) {
      res.status(400).json({
        status: "fail",
        message: "Task not found. Unable to add comment.",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "You have successfully added a comment",
      data: results,
      matchedCount: results.matchedCount,
      modifiedCount: results.modifiedCount,
    });
  } catch (err) {
    next(err);
  }
};
