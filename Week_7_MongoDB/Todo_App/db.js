const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    password: String,
    name: String,
    email: {
        type: String,
        unique: true
    }
});

const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    },
    dueAt: Date
});

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel,
    TodoModel
}