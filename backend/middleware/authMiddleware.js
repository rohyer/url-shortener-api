import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      [req.user] = await UserModel.getUserById(decoded.id);

      next();
    } catch (error) {
      throw new Error("Não autorizado");
    }
  } else {
    req.user = false;
    next();
  }
});

export default protect;
