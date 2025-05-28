require('dotenv').config();
const express = require('express');
const { UserModel, TodoModel } = require("./db");

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
}).then(() => console.log("Connected to DB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const jwt = require('jsonwebtoken');
const { auth, JWT_SECRET } = require("./auth");

const bcrypt = require('bcrypt');
const {z} = require("zod");

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res){
    const signupBody = z.object({
        password: z.string().min(8).max(100).refine(
            (val) => // Regex logic
                /[a-z]/.test(val) && 
                /[A-Z]/.test(val) &&
                /\d/.test(val) &&
                /[^A-Za-z0-9]/.test(val),
                {
                    message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                }
            ),
        name: z.string().min(1).max(100),
        email: z.string().min(3).max(100).email()
    });

    const parsedData = signupBody.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json({
            message: "Incorrect format",
            error: parsedData.error.errors
        });
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    try{
        const existingUser = await UserModel.findOne({ 
            email: email 
        });

        if (existingUser) {
            return res.status(409).json({ 
                message: "Email already exists" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            password: hashedPassword,
            name: name,
            email: email
        });
        return res.status(200).json({
            message: "You are signed up successfully"
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error" 
        });
    }
});

app.post('/signin', async function(req, res){
    const signinBody = z.object({
        password: z.string().min(8).max(100).refine(
            (val) => // Regex logic
                /[a-z]/.test(val) && 
                /[A-Z]/.test(val) &&
                /\d/.test(val) &&
                /[^A-Za-z0-9]/.test(val),
                {
                    message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                }
            ),
        email: z.string().min(3).max(100).email()
    });

    const parsedData = signinBody.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json({
            message: "Incorrect format",
            error: parsedData.error.errors
        })
    }

    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await UserModel.findOne({
            email: email
        });

        if(!user){
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if(!passwordMatch){
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);

        return res.status(200).json({
            message: "You are signed in succesfully",
            token: token
        });   
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
    
});

app.post('/todo', auth, async function(req, res){
const todoBody = z.object({
    title: z.string().min(1).max(200),
    done: z.boolean(),
    dueAt: z.string().datetime().optional()
    });

    const parsedData = todoBody.safeParse(req.body);

    if(!parsedData.success){
        return res.status(400).json({
            message: "Incorrect Todo format",
            error: parsedData.error.errors
        })
    }

    const title = req.body.title;
    const done = req.body.done;
    const dueAt = req.body.dueAt;
    const userId = req.userId;

    try{
        const todo = await TodoModel.create({
            title: title,
            done: done,
            userId: userId,
            dueAt: dueAt ? new Date(dueAt) : undefined
        });

        if (!todo) {
            return res.status(404).json({ 
                message: "Todo not found or unauthorized" 
            });
        }
    
        res.status(201).json({
            message: "Todo created successfully"
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create todo"
        });
    }
});

app.get('/todos',auth, async function(req, res){
    const userId = req.userId;

    try {
        const todos = await TodoModel.find({
            userId: userId
        }).sort({
             createdAt: -1 
        });
    
        res.json({
            todos: todos
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to fetch Todos"
        });
    }
});

app.patch('/todo/:id/done', auth, async function(req, res){
    const todoId = req.params.id;

    try {
        const todo = await TodoModel.findOneAndUpdate({
           _id: todoId,
           userId: req.userId
        }, {
            done: true
        }, {
            new: true
        });

        if (!todo) {
            return res.status(404).json({ 
                message: "Todo not found or unauthorized" 
            });
        }

        res.status(200).json({
            message: "Todo marked done"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update todo"
        });
    }
});

app.patch('/todo/:id/notdone', auth, async function(req, res){
    const todoId = req.params.id;

    try {
        const todo = await TodoModel.findOneAndUpdate({
           _id: todoId,
           userId: req.userId
        }, {
            done: false
        }, {
            new: true
        });

        if (!todo) {
            return res.status(404).json({ 
                message: "Todo not found or unauthorized" 
            });
        }

        res.status(200).json({
            message: "Todo marked undone"
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update todo"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});