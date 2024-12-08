import React, { useState } from "react";

function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("data", file);

        try {
            const response = await fetch("http://localhost:8080/photos", {
                method: "POST",
                body: formData,
            });
            const result = await response.text();
            alert(`File uploaded successfully: ${result}`);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        }
    };

    return (
        <div>
            <h2>Photo Upload</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default FileUpload;
