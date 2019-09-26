import * as mongoose from 'mongoose';
import Todo from './todo.interface';

const todoSchema = new mongoose.Schema({
    author: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    content: String,
    title: String,
    isCompleted: Boolean,
    // category: String
});

const todoModel = mongoose.model<Todo & mongoose.Document>('Todo', todoSchema);

export default todoModel;