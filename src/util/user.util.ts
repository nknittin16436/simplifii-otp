import * as jwt from 'jsonwebtoken';
export const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
}

export const getJWTToken = (user: any) => {
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );
    return token;
}