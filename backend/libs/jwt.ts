import jwt from "jsonwebtoken";

export const createToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "123", {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "123");
  } catch (error) {
    return null;
  }
};
