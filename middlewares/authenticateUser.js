require("dotenv").config();
const jwt = require('jsonwebtoken');

import { unauthorizedResposne } from "../helpers/errorResponses";

export const authenticateUser = (req, res, next) => {
    const token = req.headers["authorization"]; // "Bearer <token>"

    if (!token) {
        return unauthorizedResposne(res, 'Unauthorized USer, please login/signup');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET_KEY);
        req.user = decoded; // attach user info to req
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};
