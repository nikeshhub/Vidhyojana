import { Student } from "../Model/model.js";

export let createStudent = async (req, res) => {
  try {
    let {
      name,
      fatherName,
      motherName,
      phoneNumber,
      grade,
      address,
      dateOfBirth,
    } = req.body;

    let birthCertifications = req.files.map((value, i) => {
      return `localhost:8000/${value.filename}`;
    });
    console.log(birthCertifications);

    let result = await Student.create({
      name,
      fatherName,
      motherName,
      phoneNumber,
      grade,
      address,
      dateOfBirth,
      birthCertifications,
    });
    console.log(result);
    res.json({
      success: true,
      message: "Successfully added",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readAllStudents = async (req, res) => {
  try {
    let result = await Student.find();

    res.json({
      success: true,
      message: "Student fetched successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Data failed to fetch",
    });
  }
};

export let readSpecificStudent = async (req, res) => {
  try {
    const StudentId = req.params.id;
    const student = await Student.findById(StudentId);
    res.json({
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Student doesnt exists",
    });
  }
};

export let readSpecificClass = async (req, res) => {
  try {
    const grade = req.params.grade;
    const studentsFromGrade = await Student.find({ grade: grade });
    if (studentsFromGrade.length > 0) {
      res.json({
        success: true,
        message: `Fetched all students of ${grade} class`,
        data: studentsFromGrade,
      });
    } else {
      throw new Error("No student found in this class");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let updateStudent = async (req, res) => {
  try {
    const StudentId = req.params.id;
    const data = req.body;
    const result = await Student.findByIdAndUpdate(StudentId, data, {
      new: true,
    });
    res.json({
      success: true,
      message: "Updated Successfully!",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error updating the student",
    });
  }
};
export let deleteStudent = async (req, res) => {
  try {
    const StudentId = req.params.id;
const result = await Student.findByIdAndDelete(StudentId);

    res.json({
      success: true,
      message: "Deleted Successfully!",

    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error deleting the student",
    });
  }
};
