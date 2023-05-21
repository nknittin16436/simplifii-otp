"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const User_1 = __importDefault(require("../models/User"));
const mailSender_1 = require("../util/mailSender");
const user_util_1 = require("../util/user.util");
const oneHour = 3600000;
class LoginService {
    generateOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ email: email });
                if (user) {
                    if (user.blockedAt && new Date().valueOf() - user.blockedAt.valueOf() < oneHour) {
                        throw new Error("Cannot generate otp user is blocked");
                    }
                    if (user.otp.generatedAt && (new Date().valueOf() - user.otp.generatedAt.valueOf()) < 60000) {
                        throw new Error("Wait atleast one minute to generate another otp");
                    }
                    const otp = (0, user_util_1.generateOtp)();
                    user.otp.value = otp;
                    user.numFailedAttempts = 0;
                    user.otp.generatedAt = new Date();
                    yield user.save();
                    (0, mailSender_1.sendResetPasswordEmail)(otp, email);
                    return { otp: otp };
                }
                const otp = (0, user_util_1.generateOtp)();
                const newUser = yield User_1.default.create({
                    email,
                    otp: {
                        value: otp,
                        generatedAt: new Date()
                    },
                });
                yield newUser.save();
                (0, mailSender_1.sendResetPasswordEmail)(otp, email);
                return { otp: otp };
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    loginUser(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = loginData;
                const user = yield User_1.default.findOne({ email });
                console.log(user);
                if (!user) {
                    throw new Error("User not found");
                }
                // Check if account is blocked due to too many failed attempts
                if (user.numFailedAttempts >= 5) {
                    if (new Date().valueOf() - user.blockedAt.valueOf() < oneHour) {
                        console.log("1");
                        throw new Error("Account is blocked due to too many failed attempts. Please try again later.");
                    }
                    else {
                        user.numFailedAttempts = 0;
                        console.log(user);
                        yield user.save();
                    }
                }
                // Check if OTP is valid
                if (user.otp.value !== otp) {
                    user.numFailedAttempts++;
                    yield user.save();
                    if (user.numFailedAttempts >= 5) {
                        user.blockedAt = new Date();
                        yield user.save();
                        throw new Error("Account is blocked due to too many failed attempts. Please try again later.");
                    }
                    throw new Error("Invalid OTP");
                }
                //check if otp is expired or not (5 minute limit)
                if (new Date().valueOf() - user.otp.generatedAt.valueOf() > 300000) {
                    user.otp.value = null;
                    yield user.save();
                    throw new Error("Otp is expired");
                }
                user.numFailedAttempts = 0;
                user.otp.value = null;
                yield user.save();
                const token = (0, user_util_1.getJWTToken)(user);
                return { token };
            }
            catch (err) {
                console.error(err);
                throw new Error(err.message);
            }
        });
    }
}
exports.LoginService = LoginService;
