import { Form, Formik } from "formik";
import React from "react";
import FormikInput from "../Formik/FormikInput";
import {
  MailFilled,
  LockFilled,
  UserOutlined,
  EnvironmentFilled,
  PhoneFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import * as Yup from "yup";
import axios from "axios";
import { message } from "antd";

const Register = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    dateOfBirth: "",
    role: "admin",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
  });

  const handleSubmit = async (values) => {
    try {
      message.loading({
        content: "Registering...",
        key: "registration",
        duration: 0,
      });
      const response = await axios.post("http://localhost:8000/users", values);
      message.destroy("registration");
      message.success({ content: response.data.message, duration: 15 });
      console.log("Response from server", response);
    } catch (error) {
      message.error(error.message);
      console.log("Error registering user", error);
    }
  };

  const formStyle = {
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    padding: "50px",
    borderRadius: "8px",
    width: "400px",
    margin: "auto",
    marginTop: "50px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    backgroundColor: "#0c8fe4",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    fontSize: "14px",
    fontWeight: "bold",
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form style={formStyle}>
            <img
              style={{
                width: "300px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "30px",
              }}
              src={logo}
              alt=""
            />

            {/* <p style={{ fontSize: "18px" }}>Enter your details to register</p> */}
            <p style={{ fontSize: "18px" }}>
              Already have an account?{" "}
              <span>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </span>
            </p>
            <FormikInput
              name="fullName"
              type="text"
              required={true}
              style={inputStyle}
              label="Full Name"
              icon={
                <UserOutlined
                  style={{ color: "#00367e", fontWeight: "bold" }}
                />
              }
            />
            <FormikInput
              name="email"
              type="text"
              required={true}
              style={inputStyle}
              label="Email"
              icon={<MailFilled style={{ color: "#00367e" }} />}
            />
            <FormikInput
              name="address"
              type="text"
              required={true}
              style={inputStyle}
              label="Address"
              icon={<EnvironmentFilled style={{ color: "#00367e" }} />}
            />
            <FormikInput
              name="phoneNumber"
              type="text"
              required={true}
              style={inputStyle}
              label="Phone Number"
              icon={<PhoneFilled style={{ color: "#00367e" }} />}
            />
            <FormikInput
              name="dateOfBirth"
              type="date"
              required={true}
              style={inputStyle}
              label="Date of Birth"
              //   icon={<MailFilled style={{ color: "#00367e" }} />}
            />
            <FormikInput
              name="password"
              type="password"
              label="Password"
              required={true}
              style={inputStyle}
              icon={<LockFilled style={{ color: "#00367e" }} />}
            />

            <button
              type="submit"
              disabled={formik.isSubmitting}
              style={buttonStyle}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
