import { Schema } from "mongoose";
let studentSchema = Schema({
  name: {
    type: String,
    required: [true, "Please enter student's name"],
  },
  grade: {
    type: String,
    required: [true, "Please enter the class of students"],
  },

  fatherName: {
    type: String,
    required: [true, "Please enter father's name"],
  },
  motherName: {
    type: String,
    required: [true, "please enter mother's name"],
  },
  address: {
    type: String,
    required: [true, "Please enter the address of students"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter the phone number of students"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please enter the date of birth of students"],
  },

  birthCertifications:[
    {type: String}
  ]

  
} ,{ timestamps: true });
export default studentSchema;
