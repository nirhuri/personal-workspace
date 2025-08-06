import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TaskDocument extends Document {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    priority: string;

    @Prop({ required: true })
    assignedTo: string;

    @Prop({ required: true })
    createdBy: string;

    @Prop()
    dueDate?: Date;

    @Prop()
    completedAt?: Date;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: 1 })
    version: number;
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);