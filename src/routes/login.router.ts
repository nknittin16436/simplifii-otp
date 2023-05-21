import express from 'express';
import { Container } from 'typescript-ioc';
import { LoginController } from '../controller/login.controller';

const router = express.Router();


const loginController: LoginController = Container.get(LoginController);

router.post("/generateOtp", (req, res, next) => {
    loginController.generateOtp(req, res, next);
});

router.post("/login", (req, res, next) => {
    loginController.loginUser(req, res, next);
});

export { router as LoginRouter };