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
const userId = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'You have successfully found user by id'
    });
};


//Edit user by ID
const editUser = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'You have successfully edited user'
    })
}


// Delete User
const deleteUser = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'You have successfully deleted user'
    })
}
