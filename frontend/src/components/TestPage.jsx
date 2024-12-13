import React, {useState} from "react";

const TestPage = () => {

    //we need this React hook to check if there are photos to be displayed
    const [photos, setPhotos] = useState([])

// todo this works (linked to getPhotos input)
//make a get call and render the returned data in 'allphotos'
    const getAllPhotos = async () => {
        const response = await fetch("http://localhost:8080/photos", {method: 'GET'})
        const data = await response.json()
        // this is just for debugging
        console.log(data);
        // puts the data into the photos state
        setPhotos(data);
    };

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
// -------------------------------------------------------------
    //todo fix this function
    // maybe make a try catch so we can show an error message if we don't find the photo object
    //useState for the id input
    const [photoId, setPhotoId] = useState(0);

    const handleInputChange = (event) => {
        setPhotoId(event.target.value); // Update state on input change
    };

    const deletePhoto = async () => {
        if (!photoId) {
            alert("Please enter a valid photo ID!");
            return;
        }
        console.log(photoId)
        try {
            const response = await fetch(`http://localhost:8080/photos/${photoId}`, {
                // header: {},
                method: "DELETE",
            });
            console.log(response)
            const responseBody = await response.json(); // Parse response as JSON

            if (!response.ok) {
                // Use the error message from the backend
                throw new Error(`HTTP error! status: ${response.status}\n${responseBody.message || "Unknown error"}`);
            }

            alert(`${responseBody.fileName} was deleted successfully.`);
            console.log(responseBody); // Debugging
        } catch (error) {
            console.error("Error deleting photo:", error);
            alert(`Error deleting photo: ${error.message}`);
        }
        await getAllPhotos();
    };
// ---------------------------------------------------------------------
    // todo check this function
    // const uploadPhoto = async () => {
    //     const response = await fetch("http://localhost:8080/photos")
    //     const data = await response.json()
    //     // this is just for debugging
    //     console.log(data);
    //     // puts the data into the photos state
    //     setPhotos(data);
    // }
    //todo ths works, filename is displayed in popup

    // ----------------------------------------------------------------------
    // GPT upload function
    // -----------------------------------------------------------------------
    const [file, setFile] = useState(0);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Capture the selected file
    };

    const uploadPhoto = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("data", file); // Use "data" as the field name to match the backend

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

            // Use the returned fileName or appropriate key from the response
            alert(`${responseBody.fileName} was uploaded successfully.`);
        } catch (error) {
            console.error("Error uploading photo:", error);
            alert(`Error uploading photo: ${error.message}`);
        }
    };

    // ----------------------------------------------------------------------

    function inputChange() {

    }

    return (
        <div className="testPage">
            <h2>This Page is for testing the API calls</h2>
            <div className={"upload"}>
                <h4>Uploading</h4>
                <input type="file" onChange={handleFileChange}/>
                {/*<input id="fileupload" type="file" name="fileupload"/>*/}
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

                    </div>
                )};
            </div>
        </div>
    );

};

export default TestPage;