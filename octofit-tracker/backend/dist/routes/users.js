"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
// GET /api/users/
router.get('/', async (_req, res) => {
    const users = await User_1.User.find().select('-password');
    res.json(users);
});
// GET /api/users/:id
router.get('/:id', async (req, res) => {
    const user = await User_1.User.findById(req.params.id).select('-password');
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    return res.json(user);
});
// POST /api/users/
router.post('/', async (req, res) => {
    const user = new User_1.User(req.body);
    await user.save();
    const { password: _p, ...safe } = user.toObject();
    res.status(201).json(safe);
});
// PUT /api/users/:id
router.put('/:id', async (req, res) => {
    const user = await User_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    return res.json(user);
});
// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
    const user = await User_1.User.findByIdAndDelete(req.params.id);
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    return res.json({ message: 'User deleted' });
});
exports.default = router;
