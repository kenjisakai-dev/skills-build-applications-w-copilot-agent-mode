"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const ActivitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    activity_type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories_burned: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});
exports.Activity = (0, mongoose_1.model)('Activity', ActivitySchema);
