"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = require("../models/Leaderboard");
const router = (0, express_1.Router)();
// GET /api/leaderboard/
router.get('/', async (_req, res) => {
    const entries = await Leaderboard_1.Leaderboard.find()
        .populate('user', '-password')
        .sort({ score: -1 });
    res.json(entries);
});
// GET /api/leaderboard/:id
router.get('/:id', async (req, res) => {
    const entry = await Leaderboard_1.Leaderboard.findById(req.params.id).populate('user', '-password');
    if (!entry)
        return res.status(404).json({ error: 'Leaderboard entry not found' });
    return res.json(entry);
});
// POST /api/leaderboard/
router.post('/', async (req, res) => {
    const entry = new Leaderboard_1.Leaderboard(req.body);
    await entry.save();
    res.status(201).json(entry);
});
// PUT /api/leaderboard/:id
router.put('/:id', async (req, res) => {
    const entry = await Leaderboard_1.Leaderboard.findByIdAndUpdate(req.params.id, { ...req.body, updated_at: new Date() }, { new: true });
    if (!entry)
        return res.status(404).json({ error: 'Leaderboard entry not found' });
    return res.json(entry);
});
// DELETE /api/leaderboard/:id
router.delete('/:id', async (req, res) => {
    const entry = await Leaderboard_1.Leaderboard.findByIdAndDelete(req.params.id);
    if (!entry)
        return res.status(404).json({ error: 'Leaderboard entry not found' });
    return res.json({ message: 'Leaderboard entry deleted' });
});
exports.default = router;
