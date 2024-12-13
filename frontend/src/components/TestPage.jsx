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


    //I don't think we are currently using this one
    // if we use is see delete function for parameter use
    // todo change this to accept parameters
    //for now this gets photo 1
    const getPhotos = async () => {

        const response = await fetch("http://localhost:8080/photos/1")
        const responseBody = await response.json()


        // this is just for debugging
        console.log(responseBody);
        // puts the data into the photos state
        setPhotos(responseBody);
    };


    //useState for the 'Id' number input
    const [photoId, setPhotoId] = useState(0);

    //clickEventHandler for the delete button (read Id value)
    const handleInputChange = (event) => {
        setPhotoId(event.target.value); // Update state on input change
    };

    //This is 'delete from photos where id = *' function
    const deletePhoto = async (id) => {
        // if (!photoId) {
        //     alert("Please enter a valid photo ID!");
        //     return;
        // }
        try {
            const response = await fetch(`http://localhost:8080/photos/${id}`, {
                // header: {},
                method: "DELETE",
            });
            //for debugging
            // console.log(response)
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


    const downloadPhoto= async (id) => {

        window.open(`http://localhost:8080/download/${id}`,'_blank').focus()
    }

    //load all photos when loading the page
    //useEffect because just calling the function will cause a loop
    useEffect(() => {
        getAllPhotos();
    }, []);

    return (
        <div className="testPage">
            <h2>This Page is for testing the API calls</h2>
            <div className={"upload"}>
                <h4>Uploading</h4>
                <input type="file" onChange={handleFileChange}/>
                <button onClick={uploadPhoto}>upload Photo</button>
            </div>
            <div>
                <h4>Deleting</h4>
                <input type="number" placeholder={"Id"} onChange={handleInputChange}/>
                <button onClick={deletePhoto}>delete photo</button>
            </div>
            {/*//here we call the function*/}
            <button onClick={getAllPhotos}>getPhotos</button>

            {/*//here we render the photos*/}
            <div className="photocontent">
                {/*//here we map the photos [] to display div with every photo objects name and img*/}
                {photos.map(photo =>
                    <div key={photo.id}>
                        <h2>{photo.id}</h2>
                        <img src={"data:img/png;base64," + photo.data} alt=""/>
                        <h5>{photo.fileName}</h5>
                        <button onClick={() => downloadPhoto(photo.id)}>Download</button>
                        <button onClick={() => deletePhoto(photo.id)}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );

};

export default TestPage;