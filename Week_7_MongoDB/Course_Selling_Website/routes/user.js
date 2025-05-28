const { Router } = require('express');
const { userModel } = require('../db');
const bcrypt = require('bcrypt');
const { userAuth, JWT_SECRET_USER } = require('../middlewares/userAuthenticator');
const userRouter = Router(); 
const {z} = require("zod");
const jwt = require('jsonwebtoken');

userRouter.post('/signup', async function(req, res){
    const signupBody = z.object({
        email: z.string().min(3).max(100).email(),
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
        firstName: z.string().min(1).max(100),
        lastName: z.string().min(1).max(100),
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
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    try {
        const existingUser = await userModel.findOne({
            email : email
        });

        if(existingUser){
            return res.status(401).json({
                message : "Email Already Exist"
            }); 
        }

        hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email : email,
            password : hashedPassword,
            firstName : firstName,
            lastName : lastName
        });

        return res.status(200).json({
            message: "You are signed up successfully"
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error"
        });
    }
});

userRouter.post('/signin', async function(req, res){
    const signinBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(8)
    });

    const parsedData = signinBody.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json({
            message: "Invalid input",
            error: parsedData.error.errors
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await userModel.findOne({
            email : email
        });

        if(!user){
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword){
            return res.status(401).json({
                message : "Incorrect Credentials"
            });
        }

        const token = jwt.sign({
            userId : user._id.toString()
        }, JWT_SECRET_USER);

        return res.status(200).json({
            message: "You are signed in succesfully",
            token: token
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error"
        });
    }
});

userRouter.get('/profile', userAuth, async function (req, res) {
    try {
        const user = await userModel.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }
        res.status(200).json({
            user : user
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error" 
        });
    }
});

module.exports = {
    userRouter: userRouter
};
