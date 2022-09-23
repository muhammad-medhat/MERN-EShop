import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log('Bearer token', token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      decoded
        ? (req.user = await User.findById(decoded.uid).select("-password"))
        : null;
    } catch (err) {
      res.status(401);
      throw new Error(err);
    }
  } else {
    res.status(401);
    throw new Error("You are not authorized to access this route");
  }
  next();
});

export const admin = (req, res, next) =>{

  if(req.user && req.user.isAdmin){  
    next()
  } else {
    req.status(400)
    throw new Error('Admin Page')
  }
}
