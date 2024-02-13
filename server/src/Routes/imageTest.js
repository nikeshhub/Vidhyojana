import { Router } from "express";
import upload from "../Middlewares/upload.js";
import { postImage } from "../Controller/imageTest.js";

const imageRouter = Router();

imageRouter.route("/").post(upload.single("file"), postImage);

export default imageRouter;
