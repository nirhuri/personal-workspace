import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TaskDocument extends Document {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true, minlength: 1, maxlength: 200 })
    title: string;

    @Prop({ required: true, minlength: 1, maxlength: 1000 })
    description: string;

    @Prop({
        required: true,
        enum: ['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
        default: 'TODO'
    })
    status: string;

    @Prop({
        required: true,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
        default: 'MEDIUM'
    })
    priority: string;

    @Prop({ required: true, minlength: 1 })
    assignedTo: string;

    @Prop({ required: true, minlength: 1 })
    createdBy: string;

    @Prop({ type: Date, validate: { validator: (date: Date) => !date || date > new Date() } })
    dueDate?: Date;

    @Prop({ type: Date })
    completedAt?: Date;

    @Prop({ type: [String], default: [], validate: { validator: (tags: string[]) => tags.length <= 10 } })
    tags: string[];

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: 1, min: 1 })
    version: number;
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);

// Add indexes for better performance
TaskSchema.index({ assignedTo: 1, status: 1 });
TaskSchema.index({ createdBy: 1, status: 1 });
TaskSchema.index({ dueDate: 1, status: 1 });
TaskSchema.index({ priority: 1, status: 1 });
TaskSchema.index({ tags: 1 });
TaskSchema.index({ createdAt: -1 });