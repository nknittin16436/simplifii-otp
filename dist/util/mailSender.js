"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.sendResetPasswordEmail = void 0;
const nodemailer = __importStar(require("nodemailer"));
require("dotenv/config");
const sendEmail = (recipient, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: 465,
            auth: {
                user: process.env.NODEMAILER_MAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });
        const mailOptions = {
            from: `"Simplifii OTP" <nknittin16436@zohomail.in>`,
            to: recipient,
            subject: subject,
            text: message
        };
        yield transporter.sendMail(mailOptions);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
const sendResetPasswordEmail = (otp, email) => __awaiter(void 0, void 0, void 0, function* () {
    const message = `Your otp for login is \n\n  ${otp} \n\n If you have not requested this email then please igore it.`;
    const mailResponse = yield sendEmail(email, "OTP REQUEST | SIMPLIFII ", message);
    if (mailResponse) {
        return { success: true, message: `Check your Inbox We've sent an OTP to Mail Id ${email}` };
    }
    else
        throw new Error('Unable to send Email ');
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
