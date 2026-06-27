"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const WorkoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    exercises: [
        {
            name: { type: String, required: true },
            sets: { type: Number, required: true },
            reps: { type: Number, required: true },
        },
    ],
    duration: { type: Number, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
});
exports.Workout = (0, mongoose_1.model)('Workout', WorkoutSchema);
