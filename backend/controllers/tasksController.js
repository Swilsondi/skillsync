// Get all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const tasks = await db.collection('tasks').find().toArray();
    res.status(200).json({ status: 'success', data: tasks });
  } catch (err) {
    next(err);
  }
};

// Create a task
exports.createTasks = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const result = await db.collection('tasks').insertOne(req.body);
    res.status(201).json({ status: 'success', data: result.ops });
  } catch (err) {
    next(err);
  }
};

// Add more controller functions as needed...