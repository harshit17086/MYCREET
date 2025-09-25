import asyncHandler from "../utils/AsynHandler";
import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express';
import prisma from "../db";

import { ApiError } from "../utils/ApiError";


// Extend Express Request interface
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const verifyJWT = asyncHandler(async(req: Request, _: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        


        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_ACCESS || "")

        if (!decodedToken) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        const user = await prisma.user.findUnique({
            where: {
                id: (decodedToken as JwtPayload).id
            },
           
        })
        console.log("user in verify jwt", user);
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error: any) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})