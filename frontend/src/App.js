import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TestPage from "./components/TestPage";
import ProfileCustomization from './components/ProfileCustomization';
import './App.css';
import * as domain from "node:domain";

function App() {
    return (
        <main className={""}>
            <Navbar/>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/testpage" element={<TestPage />} />
                    <Route path="/about" element={}></Route>
                </Routes>
            </Router>
            <Footerbar/>
        </main>
    );
}

export default App;
