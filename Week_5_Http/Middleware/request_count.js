const express = require('express');
const app = express();

let requestCount = 0;

function requestCountMiddleware(req, res, next){
    requestCount++;
    console.log(requestCount);
    next();
}

app.use(requestCountMiddleware);

app.get('/sum', function(req, res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans : a+b
    });
});

app.get('/multiply', function(req, res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans : a*b
    });
});

app.listen(3000);
