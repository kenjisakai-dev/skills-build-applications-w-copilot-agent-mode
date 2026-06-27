import { Schema, model, Document } from 'mongoose';

export interface IWorkoutExercise {
  name: string;
  sets: number;
  reps: number;
}

export interface IWorkout extends Document {
  name: string;
  description: string;
  exercises: IWorkoutExercise[];
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const WorkoutSchema = new Schema<IWorkout>({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
    },
  ],
  duration:   { type: Number, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
});

export const Workout = model<IWorkout>('Workout', WorkoutSchema);
