import React, { useState, useEffect } from "react";
import "./ProfileCustomization.css";

const ProfileCustomization = () => {
    const [circleColor, setCircleColor] = useState("#3498db");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Handle color change
    const handleColorChange = (event) => {
        setCircleColor(event.target.value);
    };

    // Handle file upload
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("data", file);

        setIsUploading(true);

        try {
            const response = await fetch("http://localhost:8080/photoz", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload file.");

            const uploadedPhoto = await response.json();

            // Display the uploaded image in the circle
            setUploadedImage(`http://localhost:8080/download/${uploadedPhoto.id}`);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="profile-customization">
            <h1>Customize Your Profile</h1>

            {/* Circle with customizable color and uploaded image */}
            <div
                className="circle"
                style={{
                    borderColor: circleColor,
                    backgroundImage: uploadedImage
                        ? `url(${uploadedImage})`
                        : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
            <input
                type="color"
                value={circleColor}
                onChange={handleColorChange}
                className="color-picker"
            />

            {/* File Upload Section */}
            <div className="file-upload">
                <h2>Upload a Profile Picture</h2>
                <input type="file" onChange={handleFileUpload} />
                {isUploading && <p>Uploading...</p>}
            </div>
        </div>
    );
};

export default ProfileCustomization;
