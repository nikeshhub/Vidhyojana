import { Schema } from "mongoose";
let userSchema = Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName is required"],
    },
    email: {
      type: String,
      unique: [true, "This email address is already in use"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },

    address: {
      type: String,
      required: [true, "address is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "dateofBirth is required"],
    },
    role: {
      type: String,
      required: [true, "role is required"],
    },

    verifyEmail: {
      type: Boolean,
      //   required: [true, "verifyEmail is required"],
    },
    emailVerificationToken:{
        type: String
    }
  },
  { timestamps: true }
);
export default userSchema;
