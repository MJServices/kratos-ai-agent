import { ApiError } from "../utilities/APIResponse.js";
import { log } from "../utilities/log.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = (req, _, next) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1]|| req.body.token;
    if (!token) {
        throw new ApiError(401, "Unauthorized", ["No token provided"]);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        log(error)
        throw new ApiError(401, "Unauthorized", ["Invalid token"]);
    }
};