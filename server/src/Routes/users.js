import { Router } from "express";
import {
  createUser,
  deleteUser,
  forgotPassword,
  loginUser,
  readAllUsers,
  readSpecificUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUser,
  userProfile,
  verifyUser,
} from "../Controller/users.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import isAuthorized from "../Middlewares/isAuthorized.js";

let userRouter = Router();

userRouter.route("/").post(createUser).get(readAllUsers);

userRouter.route("/verify").patch(verifyUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/profile").get(isAuthenticated, userProfile);

userRouter.route("/update_profile").patch(isAuthenticated, updateProfile);

userRouter.route("/update_password").patch(isAuthenticated, updatePassword);

userRouter.route("/forgot_password").post(forgotPassword);

userRouter.route("/reset_password").patch(isAuthenticated, resetPassword);

userRouter
  .route("/:id")
  .get(isAuthenticated, isAuthorized(["admin", "superAdmin"]), readSpecificUser)
  .patch(isAuthenticated, isAuthorized(["admin", "superAdmin"]), updateUser)
  .delete(isAuthenticated, isAuthorized(["superAdmin"]), deleteUser);

export default userRouter;
