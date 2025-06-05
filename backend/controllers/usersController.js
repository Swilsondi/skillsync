const { ObjectId } = require('mongodb');
//Get users
exports.getAllUsers = async (req, res, next) => {
    try {
        const db = req.app.locals.db; //You grab the users collection from the database.
        const users = await db.collection('users').find().toArray(); //You use .find() to get all documents.You call .toArray() to turn the result into usable data.
        res.status(200).json({ //Then you send it back with a 200 success response.
            status: 'success',
            data: users
        })
    } 
    catch (err){
        next(err);
    }
};

//Create User
exports.createUser = async (req, res, next) => {
    try{
        const db = req.app.locals.db;
        const userData = req.body;
        const result = await db.collection('users').insertOne(userData); 
    res.status(201).json({
        status: 'success',
          data: {
    insertedId: result.insertedId,
    message: 'User created successfully'
  }})
}
catch (err){
        next(err);
    }
};

//Get user by ID
exports.userId = async (req, res, next) => {
    try{
    const db = req.app.locals.db;
    const id = new ObjectId(req.params.id);
    const results = await db.collection('users').findOne({_id: id});
    if (!results){
        res.status(404).json({
            status: 'fail',
            message: 'Couldnt find user'
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'You have successfully found user by id',
        user: results
    });
}
catch (err){
    next(err);
}
};


// Edit/Update user by ID
exports.editUser = async (req, res, next) => {
    try{
    const db = req.app.locals.db;
    const id = new ObjectId(req.params.id);
    const updates = req.body;
    const results = await db.collection('users').updateOne(
        {_id: id},
        {$set: updates}
    );
    if (results.matchedCount === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found with that id'
        });
    }
    res.status(202).json({
        status: 'success',
        message: 'You have successfully edited user',
        matchedCount: results.matchedCount,
        modifiedCount: results.modifiedCount
    })
}
    catch (err){
        next(err);
}
}


// Delete User
exports.deleteUser = async (req, res, next) => {
    try{
    const db = req.app.locals.db;
    const id = new ObjectId(req.params.id);
    const results = await db.collection('users').deleteOne({_id: id});
    if (results.deletedCount === 0){
        res.status(404).json({
            status: 'failed'
        });
    }
    res.status(200).json({
        status: 'success',
        deletedCount: results.deletedCount,
        message: 'You have successfully deleted user'
    })
}
    catch (err){
        next(err);
}
}
