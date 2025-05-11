// Promises 

/* 
A Promise in JavaScript is an object that represents the eventual
completion (or failure) of an asynchronous operation and its
resulting value.
*/

// function waitFor3Sec(resolve){
//     setTimeout(resolve, 3000);
// }

// function setTimeoutPromisfied(){
//     return new Promise(waitFor3Sec);
// }

// function logName(){
//     console.log("My name is Palash.");
// }

// setTimeoutPromisfied().then(logName);

// When waitFor3Sec's 1st argument is called the function 
// inside .then() is called.

// promisified fs.readfile()

const fs = require("fs");

function readingFile(resolve){
    return fs.readFile("Week_2_Basic_Js/a.txt", "utf-8", function(err,data){
        resolve(data);
    })
}

function readFilePromisified(){
    return new Promise(readingFile);
}

function contents(data){
    console.log(data);
}

readFilePromisified().then(contents);

