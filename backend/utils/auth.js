import jwt from "jsonwebtoken";

export const generateTokenForUser = (uid) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ uid }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
