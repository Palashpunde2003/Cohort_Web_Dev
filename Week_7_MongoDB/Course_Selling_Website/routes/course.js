const { Router } = require('express');
const { courseModel , userModel, purchaseModel} = require('../db');
const courseRouter = Router();
const {z} = require("zod");
const { userAuth } = require("../middlewares/userAuthenticator");

courseRouter.get('/preview', async function(req, res){
    try {
        const courses = await courseModel.find({});
        res.status(200).json({ 
            courses: courses 
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
});

courseRouter.post('/purchase', userAuth, async (req, res) => {
    const { courseId } = req.body;

    if (!courseId) {
        return res.status(400).json({ 
            message: "Course ID is required" 
        });
    }

    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const user = await userModel.findById(req.userId);

        const alreadyPurchased = await purchaseModel.findOne({
            courseId: courseId,
            userId: req.userId
        });

        if (alreadyPurchased) {
            return res.status(400).json({ message: "Course already purchased" });
        }

        await purchaseModel.create({
            courseId: courseId,
            userId: req.userId
        });

        user.purchasedCourses.push(courseId);
        await user.save();

        res.status(200).json({ message: "Course purchased successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

courseRouter.get('/my-courses', userAuth, async (req, res) => {
    try {
        const purchases = await purchaseModel.find({ 
            userId: req.userId 
        }).populate('courseId');
        
        const courses = purchases.map(p => p.courseId);

        res.status(200).json({ 
            courses: courses 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
});

module.exports = {
    courseRouter: courseRouter
 };