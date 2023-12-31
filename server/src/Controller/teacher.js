import { Teacher } from "../Model/model.js";

export let createTeacher = async (req, res) => {
  try {
    let { name, email, qualifications, phoneNumber, address, dateOfBirth } =
      req.body;

    let citizenship = req.files.map((value, i) => {
      return `localhost:8000/${value.filename}`;
    });
    console.log(citizenship)

    let result = await Teacher.create({
      name,
      email,
      qualifications,
      phoneNumber,
      address,
      dateOfBirth,
      citizenship,
    });

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

export let readAllTeachers = async (req, res) => {
  try {
    let result = await Teacher.find();

    res.json({
      success: true,
      message: "Teacher fetched successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Data failed to fetch",
    });
  }
};

export let readSpecificTeacher = async (req, res) => {
  try {
    const TeacherId = req.params.id;
    const teacher = await Teacher.findById(TeacherId);
    // console.log(teacher)
    res.json({
      success: true,
      message: "Teacher fetched successfully",
      data: teacher,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Teacher doesnt exists",
    });
  }
};

export let readSpecificClass = async (req, res) => {
  try {
    const grade = req.params.grade;
    const teachersFromGrade = await Teacher.find({ grade: grade });
    if (teachersFromGrade.length > 0) {
      res.json({
        success: true,
        message: `Fetched all Teachers of ${grade} class`,
        data: teachersFromGrade,
      });
    } else {
      throw new Error("No Teacher found in this class");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let updateTeacher = async (req, res) => {
  try {
    const TeacherId = req.params.id;
    const data = req.body;
    const result = await Teacher.findByIdAndUpdate(TeacherId, data, {
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
      message: "Error updating the Teacher",
    });
  }
};
export let deleteTeacher = async (req, res) => {
  try {
    const TeacherId = req.params.id;
    const result = await Teacher.findByIdAndDelete(TeacherId);

    res.json({
      success: true,
      message: "Deleted Successfully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error deleting the Teacher",
    });
  }
};
