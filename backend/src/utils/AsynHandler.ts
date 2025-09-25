
import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any> ): RequestHandler => {
  return async (req, res, next) => { 
    try {
      await fn(req, res, next);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
};

export default asyncHandler;