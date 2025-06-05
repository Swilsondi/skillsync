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


// Get task by id 
 exports.getTaskId = async (req, res, next) => {
  try {
  const db = req.app.locals.db;
  const id = new ObjectId(req.params.id);
  const results = await db.collection('tasks').findOne(
    {_id: id}
  );
  if (!results){
    res.status(404).json({
      status: 'fail',
      message: 'Task not found'
    })
  }
  res.status(200).json({
      status: 'success',
      message: 'You successfully got the task by ID.',
      tasks: results
  });
} catch (err) {
  next(err);
}
};


// Edit Task
exports.editTask = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const id = new ObjectId(req.params.id);
    const results = await db.collection('tasks').updateOne(
      {_id: id},
      {$set: req.body}
    );
    if (results.matchedCount === 0) {
       res.status(404).json({
        status: 'fail',
        message: 'Resource not found'
       })
    }
  res.status(200).json({
      status: 'success',
      message: 'You successfully edited the task by ID.',
      matchedCount: results.matchedCount,
      modifiedCount: results.modifiedCount
  });
} catch (err) {
  next(err);
}
};

// Remove Task
const removeTask = (req, res) => {
  res.status(200).json({
      status: 'success',
      message: 'You successfully removed the task by ID.'
  });
};

// Get comment
const getComment = (req, res) => {
  res.status(200).json({
      status: 'success',
      message: 'You successfully retrieved a comment'
  });
};

// Mark as claimed
const markClaimed = (req, res) => {
  res.status(201).json({
      status: 'success',
      message: 'You have successfully marked this task as claimed'
  });
};

// Add comment
const addComment = (req, res) => {
  res.status(201).json({
      status: 'success',
      message: 'You have successfully added a comment'
  });
};