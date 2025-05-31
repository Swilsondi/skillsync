const tasks = [
  { title: "Build homepage", status: "done" },
  { title: "Fix login bug", status: "in-progress" },
  { title: "Write tests", status: "todo" },
  { title: "Update docs", status: "done" },
  { title: "Refactor auth", status: "in-progress" }
];

const count = tasks.reduce((acc, curr) => {
    const status = curr.status;
    acc[status] = acc[status] ? acc[status] + 1: 1
    return acc;
}, {})

// console.log(count);

//we are looping over the array using the reduce method. We start of by setting the curr status to a variable status so we can manipulate it by checking if it has been seeen before. So on the first iteration of the loop it will look like this { title: "Build homepage", status: "done" }, at that point curr.status will be done and then acc[status] will be undefined because we wouldnt have seen a curr status value yet since it is the first iteration. If the item, status in this case is evalluated and the status in the accumulator and the comparison match then we will add 1 to that acc value and store it within that object we intialized as the accumulator. If not then we know its the first time we have seen this value of status and then we need to return the acc object back so we can display the data back in the object foormat. Accumulator is the ibject that stores the value of each status through the reduce method. Ater each iteration acc is added to the curr item we are on and then when we call return acc it gives us back that object

const languages = ["JS", "Python", "JS", "Ruby", "Python", "JS"];

const combine = languages.reduce((acc, curr) => {
   return acc[curr] === curr ? curr + 1: acc;
}, languages)
console.log(combine);