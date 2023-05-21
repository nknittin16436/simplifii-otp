import * as nodemailer from 'nodemailer';
import 'dotenv/config';
const sendEmail = async (recipient: string, subject: string, message: string): Promise<boolean> => {

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

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }

}


export const sendResetPasswordEmail = async (otp: string, email: string) => {
    const message: string = `Your otp for login is \n\n  ${otp} \n\n If you have not requested this email then please igore it.`;

    const mailResponse: boolean = await sendEmail(email, "OTP REQUEST | SIMPLIFII ", message);
    if (mailResponse) {
        return { success: true, message: `Check your Inbox We've sent an OTP to Mail Id ${email}` }
    }
    else throw new Error('Unable to send Email ');
}