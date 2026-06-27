"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
// GET /api/activities/
router.get('/', async (_req, res) => {
    const activities = await Activity_1.Activity.find().populate('user', '-password').sort({ date: -1 });
    res.json(activities);
});
// GET /api/activities/:id
router.get('/:id', async (req, res) => {
    const activity = await Activity_1.Activity.findById(req.params.id).populate('user', '-password');
    if (!activity)
        return res.status(404).json({ error: 'Activity not found' });
    return res.json(activity);
});
// POST /api/activities/
router.post('/', async (req, res) => {
    const activity = new Activity_1.Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
});
// PUT /api/activities/:id
router.put('/:id', async (req, res) => {
    const activity = await Activity_1.Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity)
        return res.status(404).json({ error: 'Activity not found' });
    return res.json(activity);
});
// DELETE /api/activities/:id
router.delete('/:id', async (req, res) => {
    const activity = await Activity_1.Activity.findByIdAndDelete(req.params.id);
    if (!activity)
        return res.status(404).json({ error: 'Activity not found' });
    return res.json({ message: 'Activity deleted' });
});
exports.default = router;
