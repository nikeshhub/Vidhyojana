import express, { json } from "express";
import connectToMongoDb from "./connectMongoDB.js";
import studentRouter from "./src/Routes/students.js";
import userRouter from "./src/Routes/users.js";
import teacherRouter from "./src/Routes/teachers.js";

const app = express();
app.use(json());
const port = 8000;

app.use("/students", studentRouter);
app.use("/users", userRouter);
app.use("/teachers", teacherRouter);
app.use(express.static("./public"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectToMongoDb();
