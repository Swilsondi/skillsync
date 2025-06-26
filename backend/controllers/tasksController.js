const tasks = require("../models/taskModels");
//TODO: incorporate map, filter, reduce, some, find, etc.

// Get all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find(); // Fetches all the resource tasks in the db collection. We find the task the user is searching for
    const unclaimedTasks = tasks.filter((task) => task.isClaimed === "false");
    const transformedTasks = tasks.map((task) => ({
      // We are then using this map method to return a new object wwith the updated user task content.
      title: task.title,
      isClaimed: task.isClaimed,
      assignedTo: task.assignedTo || "Unassigned",
      unclaimedTasks: unclaimedTasks,
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
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ status: "success", data: task });
  } catch (err) {
    next(err);
  }
};

// Get task by id
exports.getTaskId = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!Task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "You successfully got the task by ID.",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// Edit Task by ID
exports.editTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Resource not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "You successfully edited the task by ID.",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// Remove Task
exports.removeTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    const removeUnclaimed = await Task.find({ isClaimed: false });
    const removeClaimed = await Task.find({ isClaimed: true });
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "You successfully removed the task by ID.",
      data: task,
      unclaimed: removeUnclaimed,
      claimed: removeClaimed,
    });
  } catch (err) {
    next(err);
  }
};

// Get comment
exports.getComment = async (req, res, next) => {
  try {
    const { text, author } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found. Unable to add comment.",
      });
    }
    task.comments.push({
      text,
      author,
      createdAt: new Date(),
    });
    await task.save();
    res.status(201).json({
      status: "success",
      message: "You have successfully added a comment",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// Mark as claimed
exports.markClaimed = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        isClaimed: true,
        claimedAt: new Date(),
        assignedTo: req.userId,
      },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "You have successfully marked this task as claimed",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// Add comment
exports.addComment = async (req, res, next) => {
  try {
    const { text, author, title, assignedTo } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id, // Use the ID directly
      {
        $set: { title, assignedTo },
        $push: {
          comments: {
            text,
            author,
            createdAt: new Date(),
          },
        },
      },
      { new: true } // Return the updated document
    );
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found. Unable to add comment.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "You have successfully added a comment",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};
