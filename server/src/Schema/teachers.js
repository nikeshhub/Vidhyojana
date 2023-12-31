import { Schema } from "mongoose";
let teacherSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter teacher's name"],
    },
    qualifications: {
      type: String,
      required: [true, "Please enter the qualifications of teachers"],
    },

    email: {
      type: String,
      required: [true, "Please enter teacher's email"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Please enter the phone number of teachers"],
    },
    address: {
      type: String,
      required: [true, "Please enter the address of teachers"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please enter the date of birth of teachers"],
    },
   

    citizenship: [
      {
        type: String,
        required: [true, "Please upload citizenship"]
      },
    ],
  },
  { timestamps: true }
);
export default teacherSchema;
