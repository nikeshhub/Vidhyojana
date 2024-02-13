import express, { json } from "express";
import cors from "cors";
import connectToMongoDb from "./connectMongoDB.js";
import studentRouter from "./src/Routes/students.js";
import userRouter from "./src/Routes/users.js";
import teacherRouter from "./src/Routes/teachers.js";
import imageRouter from "./src/Routes/imageTest.js";

const app = express();

app.use(json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

const port = 8000;

app.use("/students", studentRouter);
app.use("/image", imageRouter);
app.use("/users", userRouter);
app.use("/teachers", teacherRouter);
app.use(express.static("./public"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectToMongoDb();
