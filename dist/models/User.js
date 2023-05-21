"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    otp: {
        value: { type: String, default: null },
        generatedAt: { type: Date, default: null }
    },
    numFailedAttempts: { type: Number, default: 0 },
    blockedAt: { type: Date, default: null }
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
