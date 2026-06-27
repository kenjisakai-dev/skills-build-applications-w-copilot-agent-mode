import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  activity_type: string;
  duration: number; // minutes
  calories_burned: number;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  user:            { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activity_type:   { type: String, required: true },
  duration:        { type: Number, required: true },
  calories_burned: { type: Number, required: true },
  date:            { type: Date, default: Date.now },
});

export const Activity = model<IActivity>('Activity', ActivitySchema);
