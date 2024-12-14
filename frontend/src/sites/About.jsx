export default function About() {
    return (
        <div className="about flex flex-col items-center m-4 py-20 text-lg leading-relaxed flex-grow">
            <h2 className="text-3xl font-bold mb-4 text-center">About the Project</h2>
            <p className="text-center max-w-3xl mb-6">
                This project was inspired by the video <b>Spring Boot Tutorial - Crash Course</b> by Marco Codes.
                It aims to be a very simple version of Google Photos, designed to allow users to upload, view, and
                manage their photos.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Features</h3>
            <ul className="list-disc list-inside max-w-3xl mb-6">
                <li>Uploading photos</li>
                <li>Viewing an overview of uploaded photos</li>
                <li>Deleting photos</li>
            </ul>
            <p className="max-w-3xl mb-6">
                All photos are saved locally in an H2 database for quick and efficient access.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Technologies Used</h3>
            <ul className="list-disc list-inside mb-6 max-w-3xl">
                <li><b>Frontend:</b> React with TailwindCSS (fully responsive design)</li>
                <li><b>Backend:</b> Java with Spring Boot (using Spring Web, JDBC, and H2 database)</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Project goal</h3>
            <p className="max-w-3xl mb-6">
                The project aspires to provide a simple and intuitive photo management experience,
                while serving as a learning opportunity for building full-stack applications.
            </p>
            <p className="max-w-3xl mb-6">
                The goal of this project was to build a complete application with a self-written API.
            </p>

            <h4 className="text-xl font-semibold mb-4">Acknowledgments</h4>
            <p className="max-w-3xl">
                I want to thank all the people who took time out of their busy lives to help and coach me with this
                project. Special thanks to:
            </p>
            <ul className="list-disc list-inside max-w-3xl mb-6">
                <li>Marco Codes for the excellent tutorial</li>
                <li>My boss Bernhard for tutoring me in best practices</li>
                <li>waradu for explaining way too many React things to me</li>
                <li>Andri for helping me debug the fetch methods</li>
                <li>All my friends for supporting me during this stressful time</li>
            </ul>
            <p className="max-w-3xl">
                I could not have done it without you!
            </p>
            <h3 className="text-2xl font-semibold mb-4">Github Project Site</h3>
            <p className={"text-blue-500 hover:underline"}><a href="https://github.com/anu03br/PhotoApp"target="_blank">https://github.com/anu03br/PhotoApp</a></p>
        </div>


    )
};