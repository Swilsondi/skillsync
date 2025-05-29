// arrayDrills.js

const tasks = [
    { id: 1, title: "Learn JS", completed: true },
    { id: 2, title: "Build a feature", completed: false },
    { id: 3, title: "Debug something", completed: false },
    { id: 4, title: "Commit to GitHub", completed: true },
  ];
  
  // 1. Map: Extract titles
  const titles = tasks.map(task => task.title);
  console.log("Titles:", titles);
  
  // 2. Filter: Only incomplete tasks
  const incompletes = tasks.filter(task => !task.completed);
  console.log("Incomplete Tasks:", incompletes);
  
  // 3. Reduce: Count completed
  const completedCount = tasks.reduce((acc, task) => {
    return task.completed ? acc + 1 : acc;
  }, 0);
  console.log("Completed Count:", completedCount);
  
  // 4. Find: First incomplete task
  const firstIncomplete = tasks.find(task => !task.completed);
  console.log("First Incomplete Task:", firstIncomplete);

  