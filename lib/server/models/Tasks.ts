import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: number;
  createdAt: number;
  updatedAt: number;
}

const taskSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  status: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Task ||
  mongoose.model<ITask>("Task", taskSchema);
