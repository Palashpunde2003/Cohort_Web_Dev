const { Router } = require('express');
const { adminModel, courseModel } = require('../db');
const bcrypt = require('bcrypt');
const { adminAuth, JWT_SECRET_ADMIN } = require('../middlewares/adminAuthenticator');
const adminRouter = Router();
const {z} = require("zod");
const jwt = require('jsonwebtoken');

adminRouter.post('/signup', async function(req, res){
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
        const existingUser = await adminModel.findOne({
            email : email
        });

        if(existingUser){
            return res.status(401).json({
                message : "Email Already Exist"
            }); 
        }

        hashedPassword = await bcrypt.hash(password, 10);

        await adminModel.create({
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

adminRouter.post('/signin', async function(req, res){
    const signinBody = z.object({
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
            )
    });

    const parsedData = signinBody.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json({
            message: "Incorrect format",
            error: parsedData.error.errors
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
        const admin = await adminModel.findOne({
            email : email
        });

        if(!admin){
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        const matchPassword = await bcrypt.compare(password, admin.password);

        if(!matchPassword){
            return res.status(401).json({
                message : "Incorrect Credentials"
            });
        }

        const token = jwt.sign({
            id: admin._id.toString()
        }, JWT_SECRET_ADMIN);

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

adminRouter.post('/course', adminAuth, async function(req, res){
    // create a course
    const courseBody = z.object({
        title : z.string().min(1),
        description: z.string().min(1),
        price: z.number().min(0),
        imageUrl: z.string().url()
    });

    const parsedData = courseBody.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input format",
            error: parsedData.error.errors
        });
    }

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const creatorId = req.creatorId;

    console.log(req.creatorId);

    try {
        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: creatorId
        });

        return res.status(200).json({
            message: "Course created successfully",
            courseId: course._id
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error"
        });
    }
});

adminRouter.put('/course/:courseId', adminAuth, async function(req, res){
    const { courseId } = req.params;

    const courseUpdateBody = z.object({
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        price: z.number().min(0).optional(),
        imageUrl: z.string().url().optional()
    });
    
    const parsedData = courseUpdateBody.safeParse(req.body);
    if (! parsedData.success) {
        return res.status(400).json({
            message: "Invalid input format",
            error:  parsedData.error.errors
        });
    }

    try {
        const course = await courseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({ 
                message: "Course not found" 
            });
        }

        if (course.creatorId.toString() !== req.creatorId) {
            return res.status(403).json({ 
                message: "You are not authorized to update this course" 
            });
        }

        const updatedCourse = await courseModel.findByIdAndUpdate(courseId, req.body, { new: true });

        return res.status(200).json({
            message: "Course updated successfully",
            course: updatedCourse
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
});

adminRouter.get('/course/bulk', adminAuth, async function(req, res){
    try {
        const courses = await courseModel.find({
            creatorId: req.creatorId 
        });
        return res.status(200).json({  
            courses : courses
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
});

adminRouter.delete('/course/:courseId', adminAuth, async function(req, res) {
    const { courseId } = req.params;

    try {
        const course = await courseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found" 
            });
        }

        if (course.creatorId.toString() !== req.creatorId) {
            return res.status(403).json({ 
                message: "You are not authorized to delete this course" 
            });
        }

        await courseModel.findByIdAndDelete(courseId);

        return res.status(200).json({
            message: "Course deleted successfully",
            courseId: courseId
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

module.exports = {
    adminRouter: adminRouter
};