import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  user: Types.ObjectId;
  score: number;
  updated_at: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  user:       { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  score:      { type: Number, required: true, default: 0 },
  updated_at: { type: Date, default: Date.now },
});

export const Leaderboard = model<ILeaderboard>('Leaderboard', LeaderboardSchema);
