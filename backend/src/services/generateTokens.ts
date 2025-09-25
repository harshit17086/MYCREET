import prisma from "../db";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";



    export const generateAccessToken = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, }
    });

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    const accessToken = jwt.sign({
        id: user.id,

    }, process.env.JWT_SECRET_ACCESS || "", { expiresIn: "1d" });
    return accessToken;
};


export const generateRefreshToken = async (userId: number) => {
    // const user = await prisma.user.findUnique({
    //     where: { id: userId },
    //     select: { id: true }
    // });
    // console.log(user)
    // if (!user) {    
    //     throw new ApiError(401, "User not found");
    // }

    const refreshToken = jwt.sign(
        {
            id: userId,

        }, process.env.JWT_SECRET_REFRESH || "", { expiresIn: "7d" });
    return refreshToken;
};


