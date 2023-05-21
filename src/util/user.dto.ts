export interface IUser {
    email: string;
    numFailedAttempts: number;
    blockedAt: Date;
    otp: IOtp;
}
export interface IOtp {
    value?: string | null;
    generatedAt: Date;
}