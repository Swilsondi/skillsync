const { ObjectId} = require('mongodb');
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
exports.getComment = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const id = new ObjectId(req.params.id);
    const result = await db.collection('tasks').findOne({_id: id});
    if (!result.comment){
      res.status(400).json({
        status: 'fail',
        message: 'Comment is not found'
      })
      return;
    }
  res.status(200).json({
      status: 'success',
      message: 'You successfully retrieved a comment',
      data: result.comment
  });
}
catch (err){
  next(err);
}
};

// Mark as claimed
const markClaimed = (req, res) => {
  res.status(201).json({
      status: 'success',
      message: 'You have successfully marked this task as claimed'
  });
};

// Add comment
exports.addComment = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const id = new ObjectId(req.params.id);
    const { text, author, title, assignedTo,  } = req.body;
    const results = await db.collection('tasks').updateOne(
      { _id: id }, // this is the filter
  { $set: { title, assignedTo }, 
      $push: {
      comments: {
        text,
        author,
        createdAt: new Date()
      }
    }
  }
    );
    if (results.matchedCount === 0){
      res.status(400).json({
        status: 'fail',
        message: 'Task not found. Unable to add comment.'
      })
      return;
    }
  res.status(200).json({
      status: 'success',
      message: 'You have successfully added a comment',
      data: results, 
      matchedCount: results.matchedCount,
      modifiedCount: results.modifiedCount,
  });
}
catch (err){
  next(err);
}
};