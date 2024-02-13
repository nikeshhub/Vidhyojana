// File: ImageUploadComponent.jsx

import React, { useState } from "react";

const TestImage = () => {
  const [profile, setProfile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", profile);
    console.log("formdata:", formData);

    fetch("http://localhost:8000/image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload successful:", data);
        // Handle success as needed
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Handle error as needed
      });
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default TestImage;
