import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CalendarEventDocument extends Document {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ default: false })
    isAllDay: boolean;

    @Prop()
    location: string;

    @Prop({ type: [String], default: [] })
    attendees: string[];

    @Prop({ required: true })
    createdBy: string;

    @Prop({ default: false })
    isShared: boolean;

    @Prop({ default: '#3B82F6' })
    color: string;

    @Prop({
        type: {
            frequency: { type: String, enum: ['NONE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'], default: 'NONE' },
            interval: { type: Number, default: 1 },
            endDate: Date,
            count: Number
        },
        default: { frequency: 'NONE', interval: 1 }
    })
    recurrence: {
        frequency: string;
        interval: number;
        endDate?: Date;
        count?: number;
    };

    @Prop({ default: 'SCHEDULED' })
    status: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: 1 })
    version: number;
}

export const CalendarEventSchema = SchemaFactory.createForClass(CalendarEventDocument); 