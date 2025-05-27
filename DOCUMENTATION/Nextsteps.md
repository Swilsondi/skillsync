✅ Where You Are Now

You’ve just:

✅ Initialized your project
✅ Connected your Express server to MongoDB
✅ Created a .gitignore and .env
✅ Confirmed the server responds to GET /
Now it's time to plan your backend structure, starting with the Task model and API architecture.

🧠 Step-by-Step Planning: Backend API Setup

🏗️ 1. What Do We Need the API to Do?
Let’s define what operations (CRUD) the user needs on “tasks”:

Action	HTTP Method	Route	Description
Create a task	POST	/api/v1/tasks	Add a new task
Read all tasks	GET	/api/v1/tasks	Get all tasks
Read one task	GET	/api/v1/tasks/:id	Get task by ID
Update a task	PUT	/api/v1/tasks/:id	Edit task info
Delete a task	DELETE	/api/v1/tasks/:id	Remove task
Comment on task	POST	/api/v1/tasks/:id/comments	Add comment
Claim task	PATCH	/api/v1/tasks/:id/claim	Mark as claimed
🧱 2. What Data Should a Task Have?
We’re not writing the Mongoose model yet — but think like a data architect. Each task should have:

title (String)
description (String)
tags (Array of strings)
skillLevel (e.g., beginner, intermediate, advanced)
postedBy (String for now — just a name)
claimed (Boolean)
comments (Array of objects → each has body, date)
➡️ Your task: Sketch out what that Mongoose schema would look like in plain English or JSON-like format.

🔌 3. Folder Structure Setup
You'll now break the backend into MVC-style (Model-View-Controller) separation.

In /backend, you need these folders:

/models        # For Mongoose schemas (Task.js)
/routes        # For all route handlers (taskRoutes.js)
/controllers   # Logic that handles each route’s work (taskController.js)
➡️ Your task: Create these folders and empty files:

models/Task.js
routes/taskRoutes.js
controllers/taskController.js
I’ll guide you through each file’s job when you're ready.

📥 4. How Routing Works in Express
You're about to separate routes from logic. Here's the plan:

server.js: Connects everything and defines /api/tasks route using a router.
routes/taskRoutes.js: Defines all the endpoints (GET /, POST /, etc.)
controllers/taskController.js: Contains the actual logic for each endpoint (e.g., get all tasks, create a task)
➡️ Your task: Think about how to structure taskRoutes.js and how it should “import” logic from the controller file (no need to code it yet — just think it through).

🧠 Review Before You Code

Here’s what I want you to do now — without jumping into code yet:

✏️ Write out your Task model structure in plain language or object-style JSON
🧱 Create the three folders + empty files listed above
🧭 Think about what each file's responsibility is (especially how routes connects to controllers)
