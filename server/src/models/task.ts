import mongoose, { Document, Schema } from 'mongoose';

interface CustomProperties {
  lebel: string;
  value: string;
}

interface ITask extends Document {
  title: string;
  status: 'To do' | 'In progress' | 'Under review' | 'Finished';
  priority?: 'Low' | 'Medium' | 'Urgent';
  deadline: string;
  description?: string;
  customProperties?: CustomProperties[];
}

const CustomPropertiesSchema: Schema = new Schema({
  lebel: { type: String, required: true },
  value: { type: String, required: true },
});

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ['To do', 'In progress', 'Under review', 'Finished'],
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'Urgent'],
    required: false
  },
  deadline: { type: String, required: true },
  description: { type: String, default: '' },
  customProperties: { type: [CustomPropertiesSchema], default: [] },
}, { timestamps: true });

const Task = mongoose.model<ITask>('Task', TaskSchema);

export { Task, ITask };
