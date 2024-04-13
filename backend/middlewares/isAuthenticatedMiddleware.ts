import {RequestHandler} from "express";

const isAuthenticatedMiddleware: RequestHandler = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401);
        return res.json({error: "ERROR: Unauthorized!"});
    }
    next();
}

export {isAuthenticatedMiddleware};