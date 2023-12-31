import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Model/model.js";
import { secretKey } from "../constant.js";
import { sendVerificationEmail } from "../utils/email.js";
import { resetPasswordEmail } from "../utils/resetPasswordEmail.js";

export let createUser = async (req, res) => {
  let data = req.body;

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    data.verifyEmail = false;
    let result = await User.create(data);
    // Generate a random verification token (you may want to use a library for this)
    let infoObj = {
      _id: result._id,
    };

    let expiryInfo = {
      expiresIn: "2d",
    };
    const verificationToken = await jwt.sign(infoObj, secretKey, expiryInfo);

    // Send verification email
    await sendVerificationEmail(data.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "Successfully added. Verification email sent.",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let verifyUser = async (req, res) => {
  try {
    let bearerToken = req.headers.authorization;
    let token = bearerToken.split(" ")[1];

    // Verify token
    let infoObj = await jwt.verify(token, secretKey);
    let userId = infoObj._id;
    console.log(userId);

    // Update user and await the result
    let result = await User.findByIdAndUpdate(
      userId,
      {
        verifyEmail: true, // Use boolean value instead of string
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Email verified",
      data: result, // Include the updated user information in the response if needed
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (user) {
      if (user.verifyEmail) {
        let isPasswordValidated = await bcrypt.compare(password, user.password);
        if (isPasswordValidated) {
          let infoObj = {
            _id: user._id,
          };

          let expiryInfo = {
            expiresIn: "365d",
          };
          const verificationToken = await jwt.sign(
            infoObj,
            secretKey,
            expiryInfo
          );
          res.json({
            success: true,
            message: "Login successful",
            data: user,
            token: verificationToken,
          });
        } else {
          let error = new Error("Password is wrong");
          throw error;
        }
      } else {
        let error = new Error("Email is not verified");
        throw error;
      }
    } else {
      let error = new Error("User not found");
      throw error;
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let userProfile = async (req, res) => {
  try {
    const userId = req._id;
    const result = await User.findById(userId);

    res.json({
      success: true,
      message: "User fetched properly",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to get profile",
    });
  }
};

export let updateProfile = async (req, res) => {
  try {
    const UserId = req._id;
    const data = req.body;

    delete data.email;
    delete data.password;

    const result = await User.findByIdAndUpdate(UserId, data, { new: true });
    res.json({
      success: true,
      message: "Profile updated",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Update failed",
    });
  }
};

export let updatePassword = async (req, res) => {
  try {
    const UserId = req._id;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;

    if (newPassword === oldPassword) {
      const error = new Error(
        "New password should be different from the old password"
      );
      throw error;
    }

    const user = await User.findById(UserId);
    const hashedPassword = user.password;
    const checkPassword = await bcrypt.compare(oldPassword, hashedPassword);
    if (checkPassword) {
      try {
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await User.findByIdAndUpdate(
          UserId,
          { password: newHashedPassword },
          { new: true }
        );
        res.json({
          success: true,
          message: "Password updated",
        });
      } catch (error) {}
    } else {
      const error = new Error("Password doesnt match");
      throw error;
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readAllUsers = async (req, res) => {
  try {
    let result = await User.find();

    res.json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Data failed to fetch",
    });
  }
};

export let readSpecificUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    const result = await User.findById(UserId);
    res.json({
      success: true,
      message: "User retreived successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "User failed to retreive",
    });
  }
};

export let updateUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    const data = req.body;

    delete data.email;
    delete data.password;
    const result = await User.findByIdAndUpdate(UserId, data, { new: true });
    res.json({
      success: true,
      message: "User updated Successfully!",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Failed to Update user `,
    });
  }
};

export let deleteUser = async (req, res) => {
  try {
    const UserId = req.params.id;

    const result = await User.findByIdAndDelete(UserId);
    res.json({
      success: true,
      message: "User deleted Successfully!",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Failed to delete user `,
    });
  }
};

export let forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user) {
      let infoObj = {
        _id: user._id,
      };

      let expiryInfo = {
        expiresIn: "2d",
      };
      const verificationToken = await jwt.sign(infoObj, secretKey, expiryInfo);

      // Send reset password email
      await resetPasswordEmail(email, verificationToken);

      res.status(201).json({
        success: true,
        message: "Email to reset password sent",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No account with this email found.",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let resetPassword = async (req, res) => {
  try {
    const UserId = req._id;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.findByIdAndUpdate(
      UserId,
      { password: hashedPassword },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Password resseted successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
