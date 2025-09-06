import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class EventStoreDocument extends Document {
    @Prop({ required: true, unique: true })
    eventId: string;

    @Prop({ required: true })
    aggregateId: string;

    @Prop({ required: true })
    aggregateType: string;

    @Prop({ required: true })
    eventType: string;

    @Prop({ type: Object, required: true })
    eventData: Record<string, any>;

    @Prop({ required: true })
    version: number;

    @Prop({ required: true })
    occurredOn: Date;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const EventStoreSchema = SchemaFactory.createForClass(EventStoreDocument);