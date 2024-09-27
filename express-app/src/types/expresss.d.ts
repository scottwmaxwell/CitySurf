import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

// Types for data authentication
interface CustomJwtPayload extends JwtPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
