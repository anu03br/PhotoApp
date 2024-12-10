import React, {useState} from "react";

const TestPage = () => {

    //we need this React hook to check if there are photos to be displayed
    const [photos, setPhotos] = useState([])

//make a get call and render the returned data in 'allphotos'
    const getAllPhotos = async () => {
        const response = await fetch("http://localhost:8080/photos")
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
        const data = await response.json()
        // this is just for debugging
        console.log(data);
        // puts the data into the photos state
        setPhotos(data);
    };

    const uploadPhoto = async () => {
        const response = await fetch("http://localhost:8080/upload.html")
        const data = await response.json()
        // this is just for debugging
        console.log(data);
    }
    //this just deletes photo 1 for now
    const deletePhoto = async () => {
        const response = await fetch("http://localhost:8080/delete/1")
        const data = await response.json()
        // this is just for debugging
        console.log(data);
    }

    return (
        <div className="testPage">
            <h2>This Page is for testing the API calls</h2>
            <div className={"upload"}>
                <input id="fileupload" type="file" name="fileupload"/>
                <button className={"photoupload"}>Choose file</button>
                <button onClick={uploadPhoto}>upload Photo</button>
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