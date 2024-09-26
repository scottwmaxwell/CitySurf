import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

// Generates user token to send to the client
export function generateToken(payload: object): string {
  return jwt.sign(payload, secret, { expiresIn: "30d" });
}

// Verifies the token is still valid
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    console.log(e);
    return null;
  }
}
