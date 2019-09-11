const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const ToDoItem = mongoose.model(
    'ToDoItem',
    new mongoose.Schema({
        _userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        category: {
            type: String
        },
        createDate: {
            type: Date,
            default: Date.now
        },
        isImportant: {
            type: Boolean,
            default: false
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    })
);

function validateToDoItem(toDoItem) {
    const schema = {
        _userId: Joi.objectId().required(),
        name: Joi.string().required(),
        category: Joi.string(),
        createDate: Joi.date(),
        isImportant:Joi.boolean(),
        isCompleted: Joi.boolean()
    };
    return Joi.validate(toDoItem, schema);
}

exports.ToDoItem = ToDoItem;
exports.validate = validateToDoItem;