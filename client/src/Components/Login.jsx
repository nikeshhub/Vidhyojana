import { Form, Formik } from "formik";
import React from "react";
import FormikInput from "./Formik/FormikInput";
import { MailFilled, LockFilled } from "@ant-design/icons";
import { Checkbox, Space } from "antd";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Login = () => {
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
    fontSize:"14px",
    fontWeight:"bold"
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          console.log("Form submitted with values:", values);
          actions.setSubmitting(false);
        }}
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
              <Checkbox style={{ color: "#00367e", fontWeight: "bold" }}>
                Remember me
              </Checkbox>
              <Link
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
                <Link> Sign Up</Link>
              </Space>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
