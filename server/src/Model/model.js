import { model } from "mongoose";
import studentSchema from "../Schema/students.js";
import userSchema from "../Schema/users.js";
import teacherSchema from "../Schema/teachers.js";
import testSchema from "../Schema/imageTest.js";

export const Student = model("Student", studentSchema);
export const User = model("User", userSchema);
export const Teacher = model("Teacher", teacherSchema);
export const Test = model("Test", testSchema);
