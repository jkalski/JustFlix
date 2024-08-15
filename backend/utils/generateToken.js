import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt-justflix",token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,   // 15 days in milliseconds
        httpOnly: true, // prevent xss attack cross site scripting, not accessed by js
        sameSite:"strict", // csrf attacks cross site request forgery
        secure: ENV_VARS.NODE_ENV !== "development", // cookie only sent in https
    });

    return token;
};