import jwt from "jsonwebtoken";
import { secretKey } from "../constant.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let infoObj = await jwt.verify(token, secretKey);
    req._id = infoObj._id;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

export default isAuthenticated;
