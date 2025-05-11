// The async and await syntax in JavaScript provides a way to 
// write asynchronous code that looks and behaves 
// like synchronous code, making it easier to read and maintain. 

// function setTimeoutPromisfied(duration){
//     return new Promise(function(resolve){
//         setTimeout(resolve, duration);
//     });
// }

// async function solve(){
//     await setTimeoutPromisfied(1000);
//     console.log('hi');
//     await setTimeoutPromisfied(3000);
//     console.log('hello');
//     await setTimeoutPromisfied(5000);
//     console.log('hi there');
// }

// solve();

const fs = require('fs');

function readFilePromisified(){
    return new Promise(function(resolve, reject){
        fs.readFile('Week_2_Basic_Js/a.txt', 'utf-8', function(err, data){
            if(err) reject(err);
            else resolve(data);
        });
    });
}

async function callback(){
    try{
        const data = await readFilePromisified();
        console.log(data);
    } catch (err) {
        console.log("ERROR READING THE FILE:", err);
    }
}

callback();


// function callback(data){
//     console.log(data);
// }
// readFilePromisified().then(callback);