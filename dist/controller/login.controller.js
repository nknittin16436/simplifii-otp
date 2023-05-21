"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const typescript_ioc_1 = require("typescript-ioc");
const login_service_1 = require("../service/login.service");
let LoginController = class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
    }
    generateOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailId = req.body.email;
                const { otp } = yield this.loginService.generateOtp(emailId);
                res.status(201).json({ success: true, otp, message: "Email sent  succesfully" });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = yield this.loginService.loginUser(req.body);
                res.status(201).json({ success: true, token, message: "User logged in succesfully" });
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
};
LoginController = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], LoginController);
exports.LoginController = LoginController;
