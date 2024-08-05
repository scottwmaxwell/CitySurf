// types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

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
