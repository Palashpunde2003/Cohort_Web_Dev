const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    purchasedCourses: [{
        type: ObjectId,
        ref: 'course'
    }]
});

const adminSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    }
});

const purchaseSchema = new Schema({ 
    courseId: {
        type: ObjectId,
        ref: 'course',
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    purchasedAt: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
