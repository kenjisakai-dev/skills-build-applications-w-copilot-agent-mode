"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
// GET /api/teams/
router.get('/', async (_req, res) => {
    const teams = await Team_1.Team.find().populate('members', '-password');
    res.json(teams);
});
// GET /api/teams/:id
router.get('/:id', async (req, res) => {
    const team = await Team_1.Team.findById(req.params.id).populate('members', '-password');
    if (!team)
        return res.status(404).json({ error: 'Team not found' });
    return res.json(team);
});
// POST /api/teams/
router.post('/', async (req, res) => {
    const team = new Team_1.Team(req.body);
    await team.save();
    res.status(201).json(team);
});
// PUT /api/teams/:id
router.put('/:id', async (req, res) => {
    const team = await Team_1.Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('members', '-password');
    if (!team)
        return res.status(404).json({ error: 'Team not found' });
    return res.json(team);
});
// DELETE /api/teams/:id
router.delete('/:id', async (req, res) => {
    const team = await Team_1.Team.findByIdAndDelete(req.params.id);
    if (!team)
        return res.status(404).json({ error: 'Team not found' });
    return res.json({ message: 'Team deleted' });
});
exports.default = router;
