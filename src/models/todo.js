const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  date: { type: Date, required: true, default: Date.now }
});

const TodoSchema = new Schema({
  owner: { type: String, required: true },
  task: [{type:TaskSchema}]
});

const Todo = mongoose.models.Todo || model('Todo', TodoSchema);

export default Todo;
