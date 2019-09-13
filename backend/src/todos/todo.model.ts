import * as mongoose from 'mongoose';
import Todo from './todo.interface';

const todoSchema = new mongoose.Schema({
    author: {
        ref: 'Todo',
        type: mongoose.Schema.Types.ObjectId,
    },
    content: String,
    title: String,
});

const todoModel = mongoose.model<Todo & mongoose.Document>('Todo', todoSchema);

export default todoModel;