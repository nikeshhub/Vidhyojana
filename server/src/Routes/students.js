import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  readAllStudents,
  readSpecificClass,
  readSpecificStudent,
  updateStudent,
} from "../Controller/students.js";
import upload from "../Middlewares/upload.js";


let studentRouter = Router();

studentRouter
  .route("/")
  .post(upload.array("files", 5), createStudent)
  .get(readAllStudents);

studentRouter.route("/:id").get(readSpecificStudent).patch(updateStudent).delete(deleteStudent);
studentRouter.route("/class/:grade").get(readSpecificClass);

export default studentRouter;
