// function sum (n){
//     return n*(n+1)/2;
// }

// var ans = sum(100);
// console.log(ans); 

// Sycnchronous approach

// const fs = require('fs'); // fs - is file system library
// const data_1 = fs.readFileSync('Week_2_Basic_Js/a.txt', 'utf-8');
// const data_2 = fs.readFileSync('Week_2_Basic_Js/b.txt', 'utf-8');
// console.log(data_1);
// console.log(data_2);

// async approach

// const fs = require("fs");

// function print(err, data) {
//     if (err) {
//         console.error("Error reading file:", err);
//         return;
//     }
//     console.log(data);
// }

// fs.readFile("Week_2_Basic_Js/a.txt", "utf-8", print); // read file async function 
// fs.readFile("Week_2_Basic_Js/b.txt", "utf-8", print);

// console.log("Done!")

function timeout(){
    console.log("Cick the button!");
}

console.log("Hi!");
setTimeout(timeout,1000);
console.log("Welcome to loupe");

let c = 0;
for(let i = 0; i<1000000000000; i++){
    c = c+1;
}
console.log("Some Expensive Operation Done!");