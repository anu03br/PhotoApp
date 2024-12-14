import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestPage from "./components/TestPage";
import './App.css';
import About from "./sites/About";
import Home from "./sites/Home";
import Navbar from "./components/Navbar";
import Footerbar from "./components/Footerbar";

function App() {
    return (
        <main className={""}>
            <Navbar/>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/about" element={<About/>} />
                </Routes>
            </Router>
            <Footerbar/>
        </main>
    );
}

export default App;
