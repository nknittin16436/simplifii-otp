import { NextFunction, Request, Response } from "express";
import { Inject } from "typescript-ioc";
import { LoginService } from "../service/login.service";

export class LoginController {
    private loginService: LoginService;

    constructor(@Inject loginService: LoginService) {
        this.loginService = loginService;
    }

    public async generateOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const emailId: string = req.body.email;
            const { otp } = await this.loginService.generateOtp(emailId);
            res.status(201).json({ success: true, otp, message: "Email sent  succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })

        }
    }

    public async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { token }: { token: string } = await this.loginService.loginUser(req.body);
            res.status(201).json({ success: true, token, message: "User logged in succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }


}