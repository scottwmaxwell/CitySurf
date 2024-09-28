import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

// Types for data authentication
interface CustomJwtPayload extends JwtPayload {
  userId: string;
  email: string;
}

// Declare user type for JwtPayLoad
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
