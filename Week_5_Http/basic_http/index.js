const express = require('express');
const app = express();

app.get('/multiply', function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans : a*b
    })
});

app.get('/sum', function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans : a+b
    })
});

app.get('/divide', function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans : a/b
    })
});

app.get('/substract', function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans : a-b
    })
});

app.listen(3000);
