const task = [
  { title: "Build homepage", status: "done" },
  { title: "Fix login bug", status: "in-progress" },
  { title: "Write tests", status: "todo" },
  { title: "Update docs", status: "done" },
  { title: "Refactor auth", status: "in-progress" }
];

const count = task.reduce((acc, curr) => {
    const status = curr.status;
    acc[status] = acc[status] ? acc[status] + 1: 1
    return acc;
}, {})

// console.log(count);

//we are looping over the array using the reduce method. We start of by setting the curr status to a variable status so we can manipulate it by checking if it has been seeen before. So on the first iteration of the loop it will look like this { title: "Build homepage", status: "done" }, at that point curr.status will be done and then acc[status] will be undefined because we wouldnt have seen a curr status value yet since it is the first iteration. If the item, status in this case is evalluated and the status in the accumulator and the comparison match then we will add 1 to that acc value and store it within that object we intialized as the accumulator. If not then we know its the first time we have seen this value of status and then we need to return the acc object back so we can display the data back in the object foormat. Accumulator is the ibject that stores the value of each status through the reduce method. Ater each iteration acc is added to the curr item we are on and then when we call return acc it gives us back that object

// const tech = ["AI", "Blockchain", "AI", "Web", "AI", "Web", "Blockchain"];

// const combine = tech.reduce((acc, curr) => {
//     acc[curr] = acc[curr] ? acc[curr] + 1: 1;
//     return  acc;
// }, {})

// console.log(combine);

// { AI: 3, Blockchain: 2, Web: 2 }

// I first need to return a obj so that should look like setting the acc to a empty object. On every iteration of the loop we will check if the current item we are at in the array matches what we have stored in the acc. On the first iteration the acc should show undefined and the curr value would be AI. The next iteration the acc should be "AI" Because it would have added the previous curr to our acc and our curr value should have moved to [1] which would be 'Blockchain . So then the acc which was undefined before wil check if the new value in the acc is equal to the current item we are iterating over currrently. If it matches add 1 to the curr value if not set it to 1 because it will be the first time we have seen it. 


const tasks = [
  { title: "Deploy site", status: "done" },
  { title: "Fix bug", status: "todo" },
  { title: "Write docs", status: "done" },
  { title: "Design UI", status: "in-progress" }
];


 const groupedTasks = tasks.reduce((acc, curr) => {
      const userStatus = curr.status;
      const userTitle = curr.title;
      if (!acc[userStatus]){
        acc[userStatus] = [];
      }
      acc[userStatus].push(userTitle);
      return acc;
 }, {})

//  console.log(groupedTasks);
// {
//   done: ["Deploy site", "Write docs"],
//   todo: ["Fix bug"],
//   "in-progress": ["Design UI"]
// }

// First since the output needs me to return an obj i will intiallize acc as a empty object. Then we will need to group and grab the status key and its values so I could set curr.status to be stored in a variable userStatus and do the same for the titles and then we can go ahead and then we need some kind of container to store the title so we can initialize an empty array called titles and push the title of the user task into that array. That way we are pushing the value into the object keys which will be the curr value of the tasks status keys. We finally need to return the acc so we can get the full object and the array we pushed to it. Currently my returned obj isnt displaying the done key correctly it shows 1 and i cant understand why its showing 1. At the first iteration acc is an empty obj undeined and the curr userStatus is done and so it shoould be checking my terinary operator to check the condition to see if the current item is equal to the vallue the acc has and since it wont be the same it should run this code [userTitle]. Im realizing now that something is wrong with the logic. to check because its not running like i inteneded and instead running this line title.push([userTitle]). THis line has to be wrong because when i moved it to the other else the 1 from done followed to the other todo and inprogress keys. I currently trying to push the title into that empty array. At first i had acc[userTitle] being pushed that didnt work either.It has to be with the way im pushing the usertTitle its not working as expected and ive been working on this for about 30 mins so im going to need help here and try to understand why the 1 is showing there and why me trying to push the title to tasks isnt working as intended.


const donations = [
  { donor: "Ella", amount: 20 },
  { donor: "Max", amount: 35 },
  { donor: "Ella", amount: 40 },
  { donor: "Leo", amount: 15 }
];

const donors = donations.reduce((acc, curr) => {
     const people = curr.donor;
     const amount = curr.amount;
     if (acc[people]){
        acc[people] += amount; 
     } else {
        acc[people] = amount;
     }
     return acc;
}, {})

console.log(donors);
// {
//   Ella: 60,
//   Max: 35,
//   Leo: 15
// }


// 🔄 ITERATION BY ITERATION VISUAL:
// 🟠 Step 1: curr = { donor: "Ella", amount: 20 }
// acc = {}

// acc["Ella"] does not exist yet

// So: acc["Ella"] = 20

// ✅ acc = { Ella: 20 }

// 🟠 Step 2: curr = { donor: "Max", amount: 35 }
// acc = { Ella: 20 }

// acc["Max"] does not exist

// So: acc["Max"] = 35

// ✅ acc = { Ella: 20, Max: 35 }

// 🟠 Step 3: curr = { donor: "Ella", amount: 40 }
// acc = { Ella: 20, Max: 35 }

// acc["Ella"] already exists ✅

// So: acc["Ella"] += 40 → now 60

// ✅ acc = { Ella: 60, Max: 35 }

// 🟠 Step 4: curr = { donor: "Leo", amount: 15 }
// acc = { Ella: 60, Max: 35 }

// acc["Leo"] does not exist

// So: acc["Leo"] = 15

// ✅ Final acc = { Ella: 60, Max: 35, Leo: 15 }

// 🧱 Key Mental Model:
// Think of .reduce() like building a box one piece at a time:

// If the piece (key) exists: add to it

// If not: create it

