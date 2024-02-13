import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

const VerifyEmail = () => {
    const navigate = useNavigate()
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const handleSubmit = async () => {
    try {
      const response = await axios({
        method: "PATCH",
        url: "http://localhost:8000/users/verify",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success(response.data.message);
      navigate("/login")

    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        // fontFamily: "Arial, sans-serif",
        textAlign: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Verify your email address by clicking on the button below
      </h1>
      <MailOutlined
        style={{
          fontSize: "40px",
          color: "#4caf50",
          marginBottom: "20px",
        }}
      />
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleSubmit}
      >
        Verify your email
      </button>
    </div>
  );
};

export default VerifyEmail;
