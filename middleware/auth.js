/* eslint-disable import/no-anonymous-default-export */
import { getToken } from "next-auth/jwt";

export default async (req, res, next) => {
    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === 'production'
    });
    if (token) {
        // signed in 
        // console.log("Token", token);
        req.user = token.sub;

        // console.log("User", token.sub);
        next();
    } else {
        res.status(401).json({ message: "Not Signed in " });
    }
    // res.end();
};