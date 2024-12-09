import React from "react";

const TestPage = () => {

    const getPhotos = async () => {
        const response = await fetch("http://localhost:8080/photos")
        const data = await response.json()
        // this is just for debugging
        console.log(data);
    };

    const uploadPhoto =async () => {
        const response = await fetch("http://localhost:8080/upload.html")
        const data = await response.json()
        // this is just for debugging
        console.log(data);
    }
    //this just deletes photo 1 for now
    const deletePhoto =async () => {
        const response = await fetch("http://localhost:8080/delete/1")
        const data = await response.json()
        // this is just for debugging
        console.log(data);
    }

    return (
        <div className="testpage">
            <h2>This Page is for testing the API calls</h2>
            <button onClick={getPhotos}>getPhotos</button>
            <button onClick={uploadPhoto}>upload</button>
            <button onClick={deletePhoto}>delete id 1</button>
        </div>
    );
};

export default TestPage;