const employees = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "HR" },
  { name: "Charlie", department: "Engineering" },
  { name: "Dana", department: "Marketing" },
  { name: "Eli", department: "Engineering" },
  { name: "Faye", department: "HR" }
];



const numberDept = employees.reduce((acc, curr) => {
  const dept = curr.department;
  
  acc[dept] = acc[dept] ? acc[dept] + 1 : 1;
  
  return acc;
}, {});

console.log(numberDept);