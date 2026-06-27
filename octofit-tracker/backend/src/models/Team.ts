import { Schema, model, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: Types.ObjectId[];
  created_at: Date;
}

const TeamSchema = new Schema<ITeam>({
  name:       { type: String, required: true, unique: true },
  members:    [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created_at: { type: Date, default: Date.now },
});

export const Team = model<ITeam>('Team', TeamSchema);
