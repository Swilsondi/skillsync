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


