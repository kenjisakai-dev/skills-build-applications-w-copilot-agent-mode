"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const LeaderboardSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    score: { type: Number, required: true, default: 0 },
    updated_at: { type: Date, default: Date.now },
});
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', LeaderboardSchema);
