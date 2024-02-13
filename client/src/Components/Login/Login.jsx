import { Form, Formik } from "formik";
import React from "react";
import FormikInput from "../Formik/FormikInput";
import { MailFilled, LockFilled } from "@ant-design/icons";
import { Checkbox, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        values
      );
      //getting token from response.data
      const authToken = response.data.token;

      // setting the token in local storage
      localStorage.setItem("authToken", authToken);
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  const formStyle = {
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    padding: "50px",
    borderRadius: "8px",
    width: "350px",
    margin: "auto",
    marginTop: "50px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "16px",
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

            <FormikInput
              name="email"
              type="text"
              required={true}
              style={inputStyle}
              label="Email"
              icon={<MailFilled style={{ color: "#00367e" }} />}
            />

            <FormikInput
              name="password"
              type="password"
              label="Password"
              required={true}
              style={inputStyle}
              icon={<LockFilled style={{ color: "#00367e" }} />}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#00367e",
                }}
              >
                <input type="checkbox" /> Remember me
              </label>

              <Link
                to="/forgot-password"
                style={{
                  fontSize: "14px",
                  textDecoration: "none",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              style={buttonStyle}
            >
              Login
            </button>
            <div
              style={{
                marginTop: "12px",
                fontSize: "14px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Space>
                <p> Dont have an account?</p>
                <Link to="/register"> Sign Up</Link>
              </Space>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
