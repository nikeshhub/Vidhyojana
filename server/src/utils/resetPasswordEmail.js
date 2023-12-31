import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nikeshsapkota2021@gmail.com", // replace with your Gmail email
    pass: "fxtl sxvi ssmz hyvt", // replace with your Gmail password or app-specific password
  },
});

export const resetPasswordEmail = async (to, verificationToken) => {
  const mailOptions = {
    from: "nikeshsapkota2021@gmail.com",
    to,
    subject: "Reset your password",
    html: `
      <p>Please click the following link to reset your password:</p>
      <a href="http://localhost:3000/reset-password?token=${verificationToken}">Verify Email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password resetted");
  } catch (error) {
    console.error("Error resetting password", error);
    throw error;
  }
};
export const generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
