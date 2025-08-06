import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class NoteDocument extends Document {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    createdBy: string;

    @Prop({ type: [String], default: [] })
    sharedWith: string[];

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: 1 })
    version: number;
}

export const NoteSchema = SchemaFactory.createForClass(NoteDocument); 