const express = require('express');
const app = express();

let todos = [];

app.use(express.json());

app.post('/todos/create', function(req, res){
    const {title,id} = req.body;
    todos.push({title,id});
    res.status(201).json({message: 'Todo added succesfully'});
})

app.delete('/todos/delete/:id', function(req, res){
    const todoId = Number(req.params.id);
    for(let i=0; i<todos.length; i++){
        if(todos[i].id == todoId){
            todos.splice(i,1);
            break;
        }
    }
    console.log(todos);
    res.status(201).json({message: 'Todo removed succesfully'});
})

app.get('/todos/read',function(req,res){
    let responseText = todos.map(todo => `${todo.id}. ${todo.title}`).join('<br>');
    res.send(`<h1>${responseText}</h1>`);
})

app.listen(3000, (error) =>{
        if(!error){
            console.log("Server is Successfully Running, and App is listening on port 3000");
            }
        else {
            console.log("Error occurred, server can't start", error);
            }
        }   
    );
