"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRouter = void 0;
const express_1 = __importDefault(require("express"));
const typescript_ioc_1 = require("typescript-ioc");
const login_controller_1 = require("../controller/login.controller");
const router = express_1.default.Router();
exports.LoginRouter = router;
const loginController = typescript_ioc_1.Container.get(login_controller_1.LoginController);
router.post("/generateOtp", (req, res, next) => {
    loginController.generateOtp(req, res, next);
});
router.post("/login", (req, res, next) => {
    loginController.loginUser(req, res, next);
});
