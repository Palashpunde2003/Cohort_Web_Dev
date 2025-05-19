// Create a middleware function that logs each incoming
// request’s HTTP method, URL, and timestamp to the console

const express = require('express');
const app = express();

app.use(express.json());

function logWebsiteInfo(req,res,next) {
    const date = new Date();
    const info = [{"method": req.method, "url": req.url , "timestamp": date.toISOString()}];
    console.log(info);
    next();
}
app.use(logWebsiteInfo);

app.get('/sum', function(req, res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.send(`<div> Sum is ${a+b}. </div>`);
});

app.post('/multiply', function(req, res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.send(`<div> Product is ${a*b}. </div>`);
});

app.listen(3000);