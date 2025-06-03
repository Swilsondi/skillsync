CLIENT → Express Server (server.js) → Router (tasksRouter.js or usersRouter.js)
→ Controller (tasksController.js or userController.js) → MongoDB
← Response Back to Client

Line/Concept
async function Allows us to use await inside the function
await client.connect() Waits for MongoDB to connect
try { ... } Run code that might fail
catch (err) Catch any errors that happen in try
app.locals.db = ... Makes the DB accessible in other files (like controllers)
app.use('/api/v1/...') Mounts the routers so they can handle incoming requests
app.listen(...) Starts the server when everything is ready
