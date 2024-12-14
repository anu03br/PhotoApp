import React, {useEffect, useState} from "react";

const TestPage = () => {

    //React needs a  useState and eventHandler for the upload input
    const [file, setFile] = useState(0);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Capture the selected file
    };

    //Make a POST call with attached file from 'file' input
    const uploadPhoto = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        // Use "data" as the field name to match the backend, append 'file' from input
        formData.append("data", file);

        try {
            const response = await fetch("http://localhost:8080/photos", {
                method: "POST",
                body: formData,
            });

            // Read the response as JSON once
            const responseBody = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}\n${responseBody.message || "Unknown error"}`);
            }

            // Use the returned fileName for the alert
            alert(`${responseBody.fileName} was uploaded successfully.`);
        } catch (error) {
            console.error("Error uploading photo:", error);
            alert(`Error uploading photo: ${error.message}`);
        }
        //refresh Photo display after delete
        await getAllPhotos();
    };


    //we need this React hook to check if there are photos to be displayed
    const [photos, setPhotos] = useState([])


    //make a get call and render the returned data in 'allphotos'
    const getAllPhotos = async () => {
        const response = await fetch("http://localhost:8080/photos", {method: 'GET'})
        const data = await response.json()
        // this is just for debugging
        console.log(data);
        // puts the data into the photos state
        setPhotos(data);
    };

    //useState for the 'Id' number input
    const [photoId, setPhotoId] = useState(0);

    //clickEventHandler for the delete button (read Id value)
    const handleInputChange = (event) => {
        setPhotoId(event.target.value); // Update state on input change
    };

    //This is 'delete from photos where id = *' function
    const deletePhoto = async (id) => {

        try {
            const response = await fetch(`http://localhost:8080/photos/${id}`, {
                method: "DELETE",
            });
            // Parse response as JSON
            const responseBody = await response.json();

            //if something goes wrong
            if (!response.ok) {
                // Use the error message from the backend
                throw new Error(`HTTP error! status: ${response.status}\n${responseBody.message || "Unknown error"}`);
            }
            //if delete is sucessfull
            alert(`${responseBody.fileName} was deleted successfully.`);
            console.log(responseBody); // Debugging
        } catch (error) {
            //if photo is not found this will fire
            console.error("Error deleting photo:", error);
            alert(`Error deleting photo: ${error.message}`);
        }
        //refresh Photo display after delete
        await getAllPhotos();
    };


    const downloadPhoto = async (id) => {

        window.open(`http://localhost:8080/download/${id}`, '_blank').focus()
    }

    //load all photos when loading the page
    //useEffect because just calling the function will cause a loop
    useEffect(() => {
        getAllPhotos();
    }, []);

    return (
        <div className="uploadpage w-full min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Upload a new Photo</h2>

            <div className="upload bg-gray-100 p-4 rounded shadow-md w-1/2 mx-auto min-w-[500px]">
                <div className="uploadbuttons flex items-center justify-between gap-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="flex-grow file:bg-secondary file:text-white file:px-4 file:py-2 file:rounded file:hover:bg-secondary-600 file:transition file:border-0"
                    />
                    <button
                        onClick={uploadPhoto}
                        className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-600 transition  min-w-[140px]"
                    >
                        Upload Photo
                    </button>
                </div>
            </div>

            {/* Rendering the photos */}
            <div className="photocontent mt-8 grid gap-4 grid-cols-1 md:grid-cols-2">
                {photos.map(photo => (
                    <div
                        key={photo.id}
                        className="photocontainer p-4 border border-gray-500 rounded shadow-md bg-white"
                    >
                        <h2 className="text-lg font-semibold">{photo.id}</h2>
                        <img
                            src={`data:img/png;base64,${photo.data}`}
                            alt=""
                            className="w-full h-auto mt-2 rounded"
                        />
                        <h5 className="mt-2 text-gray-700 truncate overflow-hidden text-ellipsis w-full">{photo.fileName}</h5>
                        <div className="photobuttons mt-4 flex justify-between items-center">
                            <button
                                onClick={() => downloadPhoto(photo.id)}
                                className="bg-secondary text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Download
                            </button>
                            <button
                                onClick={() => deletePhoto(photo.id)}
                                className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default TestPage;