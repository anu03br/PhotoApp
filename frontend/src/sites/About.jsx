export default function About() {
    return  (
        <div className={"about justify-items-center m-4 py-20 text-xl flex-grow"}>
            <h2>About the Project</h2>
            <p>This project was inspired by the video <b>Spring Boot Tutorial - Crash Course</b> by Marco Codes.
                It aims to be a very simple version of Google Photos, designed to allow users to upload, view, and
                manage their photos.</p>

            <h3>Features</h3>
            <ul>
                <li>Uploading photos</li>
                <li>Viewing an overview of uploaded photos</li>
                <li>Deleting photos</li>
            </ul>
            <p>All photos are saved locally in an H2 database for quick and efficient access.</p>

            <h3>Technologies Used</h3>
            <ul>
                <li><b>Frontend:</b> React with TailwindCSS (fully responsive design)</li>
                <li><b>Backend:</b> Java with Spring Boot (using Spring Web, JDBC, and H2 database)</li>
            </ul>

            <h3>Vision</h3>
            <p>The project aspires to provide a simple and intuitive photo management experience,
                while serving as a learning opportunity for building full-stack applications.</p>
            <p>The goal of this project was to build a complete application with a functioning </p>

            <h4>Acknowledgments</h4>
            <p>I want to thank all the people who took time out of their busy lives to help and coach me with this
                project.
                Special thanks to:
                <ul>
                    <li>Marco Codes for the excellent tutorial</li>
                    <li>My mentors and peers who guided me throughout the journey</li>
                    <li>Online communities that offered valuable advice</li>
                </ul>
                I could not have done it without you!
            </p>


        </div>

    )
};