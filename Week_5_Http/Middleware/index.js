const express = require('express');
const app = express();

//function use

// function isAboveAge(age){
//     if(age>= 14){
//         return true;
//     } else { 
//         return false;
//     }
// }

// app.get('/ride1', function(req, res){
//     if(isAboveAge(req.query.age)){ // query - "/ride1/?age=10"
//         res.json({
//             msg: "You have successfully ridden the ride 1"
//         });
//     } else {
//         res.status(411).json({
//             msg: "Sorry you are not old enough"
//         });
//     }
// })

// app.get('/ride2', function(req, res){
//     if(isAboveAge(req.query.age)){ // query - "/ride2/?age=10"
//         res.json({
//             msg: "You have successfully ridden the ride 2"
//         });
//     } else {
//         res.status(411).json({
//             msg: "Sorry you are not old enough"
//         });
//     }
// })

// middleware use
function isAboveAgeMiddleware(req, res, next){
    const age = req.query.age;
    if(age>= 14){
        next();
    } else { 
        res.json({
            msg: "Sorry, You're not old enough"
        });
    }
}


app.use(isAboveAgeMiddleware); // everything below it uses isAboveAgeMiddleware
// app.get('/ride1', isAboveAgeMiddleware, function(req, res){

// ^ 2 ways to use middleware 

app.get('/ride1', function(req, res){
    res.json({
        msg: "You have successfully ridden the ride 1"
    });
});

app.get('/ride2', function(req, res){
    res.json({
        msg: "You have successfully ridden the ride 2"
    });
});


app.listen(3000, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port 3000");
        }
    else {
        console.log("Error occurred, server can't start", error);
        }
    }   
); 
