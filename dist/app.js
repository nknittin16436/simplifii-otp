"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const login_router_1 = require("./routes/login.router");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Hey this is my OTP API running');
});
app.use("/api/v1", login_router_1.LoginRouter);
exports.default = app;
