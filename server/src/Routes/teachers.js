import { Router } from "express";

import upload from "../Middlewares/upload.js";
import { createTeacher, deleteTeacher, readAllTeachers, readSpecificTeacher, updateTeacher } from "../Controller/teacher.js";

let teacherRouter = Router();

teacherRouter
  .route("/")
  .post(upload.array("files", 5), createTeacher)
  .get(readAllTeachers);

teacherRouter
  .route("/:id")
  .get(readSpecificTeacher)
  .patch(updateTeacher)
  .delete(deleteTeacher);

export default teacherRouter;
