import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nikeshsapkota2021@gmail.com", // replace with your Gmail email
    pass: "fxtl sxvi ssmz hyvt", // replace with your Gmail password or app-specific password
  },
});

export const sendVerificationEmail = async (to, verificationToken) => {
  const mailOptions = {
    from: "nikeshsapkota2021@gmail.com",
    to,
    subject: "Email Verification",
    html: `
      <p>Thank you for registering with our school management system.</p>
      <p>Please click the following link to verify your email:</p>
      <a href="http://localhost:3000/verify-email?token=${verificationToken}">Verify Email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
export const generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
