import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TestPage from "./components/TestPage";
import ProfileCustomization from './components/ProfileCustomization';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile-customization" element={<ProfileCustomization />} />
                    <Route path="/testpage" element={<TestPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
