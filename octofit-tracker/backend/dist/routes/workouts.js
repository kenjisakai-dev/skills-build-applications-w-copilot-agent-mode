"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
// GET /api/workouts/
router.get('/', async (_req, res) => {
    const workouts = await Workout_1.Workout.find();
    res.json(workouts);
});
// GET /api/workouts/:id
router.get('/:id', async (req, res) => {
    const workout = await Workout_1.Workout.findById(req.params.id);
    if (!workout)
        return res.status(404).json({ error: 'Workout not found' });
    return res.json(workout);
});
// POST /api/workouts/
router.post('/', async (req, res) => {
    const workout = new Workout_1.Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
});
// PUT /api/workouts/:id
router.put('/:id', async (req, res) => {
    const workout = await Workout_1.Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workout)
        return res.status(404).json({ error: 'Workout not found' });
    return res.json(workout);
});
// DELETE /api/workouts/:id
router.delete('/:id', async (req, res) => {
    const workout = await Workout_1.Workout.findByIdAndDelete(req.params.id);
    if (!workout)
        return res.status(404).json({ error: 'Workout not found' });
    return res.json({ message: 'Workout deleted' });
});
exports.default = router;
