// const express = require('express');
// const app = express();

// const jwt = require('jsonwebtoken');
// const JWT_SECRET = "something_sensitive";

// app.use(express.json());

// const users = [];


// // genrating token manually
// function generateToken(){
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
//      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
//       't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
//        'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
//         'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
//          '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let token = "";
//     for(let i = 0; i < 32; i++){
//         token += options[Math.floor(Math.random()*options.length)];
//     }
//     return token;
// }

// app.post('/signup', function(req, res){
//     let username = req.body.username;
//     let password = req.body.password;

//     if(users.find(user => user.username === username)){
//         res.json({
//             message: "You are already signed up"
//         });
//         return;
//     }

//     users.push({
//         username : username,
//         password : password
//     });

//     res.send({
//         message: "You are signed up"
//     });
// });

// app.post('/signin', function(req, res){
//     const username = req.body.username;
//     const password = req.body.password;

//     const user = users.find(user => user.username === username 
//                             && user.password === password);

//     if(user){
//         // const token = generateToken();
//         const token = jwt.sign({  
//             username: username   // JWTs usage - signing
//         }, JWT_SECRET);

//         // user.token = token
//         res.json({
//             message: token
//         });
//     } else {
//         res.status(403).send({
//             message: "Invalid username or password"
//         })
//     }

//     console.log(users);
// });

// app.get('/me', function(req, res){
//     const token = req.headers.autherization; // JWTs - decoding
//     const decodedInformation = jwt.verify(token, JWT_SECRET); 
//     const username = decodedInformation.username;

//     //const user = users.find(user => user.token === token);
//     const user = users.find(user => user.username === username);
//     if(user){
//         res.send({
//             username: user.username,
//             password: user.password
//         });
//     } else {
//         res.status(401).send({
//             message: "Unauthorized"
//         });
//     }
// });

// app.listen(3000, (error) =>{
//     if(!error){
//         console.log("Server is Successfully Running, and App is listening on port 3000");
//         }
//     else {
//         console.log("Error occurred, server can't start", error);
//         }
//     }   
// ); 

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
JWT_SECRET = "something_senistive";

app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

const users = [];

app.post('/signup', function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username);
    if(user){
        return res.status(403).json({
            message: "You are already have account"
        });
    }

    users.push({
        username: username,
        password: password
    });

    res.json({
        message : "You are signed up"
    });
});

app.post('/signin', function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);
    if(user){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);

        res.json({
            token : token
        });
    } else {
        res.status(401).json({
            message: "Invalid username or password"
        });
    }
});

function auth(req, res, next){
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, JWT_SECRET);

    if(decodedInfo.username){
        req.username = decodedInfo.username
        next();
    } else {
        res.status(404).json({
            message: "You are not logged in"
        });
    }
}

app.get('/me', auth, function(req, res){
    const user = users.find(user => user.username === req.username);
    if(user){
        res.send({
            username : user.username,
            password: user.password
        });
    }
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

