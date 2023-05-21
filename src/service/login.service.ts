import User from "../models/User";
import { sendResetPasswordEmail } from "../util/mailSender";
import { generateOtp, getJWTToken } from "../util/user.util";
const oneHour = 3600000;
export class LoginService {
    public async generateOtp(email: string) {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                if (user.blockedAt && new Date().valueOf() - user.blockedAt.valueOf() < oneHour) {
                    throw new Error("Cannot generate otp user is blocked")
                }

                if (user.otp.generatedAt && (new Date().valueOf() - user.otp.generatedAt.valueOf()) < 60000) {
                    throw new Error("Wait atleast one minute to generate another otp")

                }
                const otp: string = generateOtp();
                user.otp.value = otp;
                user.numFailedAttempts = 0;
                user.otp.generatedAt = new Date();
                await user.save();
                sendResetPasswordEmail(otp, email);
                return { otp: otp }
            }

            const otp = generateOtp();
            const newUser = await User.create({
                email,
                otp: {
                    value: otp,
                    generatedAt: new Date()
                },

            })

            await newUser.save();
            sendResetPasswordEmail(otp, email);
            return { otp: otp }

        } catch (err: any) {
            throw new Error(err.message)
        }
    }


    public async loginUser(loginData: any) {
        try {
            const { email, otp } = loginData;

            const user = await User.findOne({ email });
            console.log(user)
            if (!user) {
                throw new Error("User not found")
            }

            // Check if account is blocked due to too many failed attempts
            if (user.numFailedAttempts >= 5) {
                if (new Date().valueOf() - user.blockedAt.valueOf() < oneHour) {
                    console.log("1")
                    throw new Error("Account is blocked due to too many failed attempts. Please try again later.")
                }
                else {
                    user.numFailedAttempts = 0;
                    console.log(user)
                    await user.save();
                }
            }

            // Check if OTP is valid
            if (user.otp.value !== otp) {
                user.numFailedAttempts++;
                await user.save();
                if (user.numFailedAttempts >= 5) {
                    user.blockedAt = new Date();
                    await user.save();
                    throw new Error("Account is blocked due to too many failed attempts. Please try again later.")
                }
                throw new Error("Invalid OTP")
            }
            //check if otp is expired or not (5 minute limit)
            if (new Date().valueOf() - user.otp.generatedAt.valueOf() > 300000) {
                user.otp.value = null;
                await user.save();
                throw new Error("Otp is expired")
            }

            user.numFailedAttempts = 0;
            user.otp.value = null;
            await user.save();

            const token = getJWTToken(user);

            return { token };

        } catch (err: any) {
            console.error(err);
            throw new Error(err.message)
        }
    }
}