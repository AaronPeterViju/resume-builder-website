import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ATSChecker from './components/ATSChecker';
import ResumeBuilder from './components/ResumeBuilder';
import Admindash from './components/Admindash'; //admindash
import AtsScoreControl from './components/AtsScoreControl'; //AtsScoreControl
import Index from './components/Index'; // Ensure this matches the file name
import './styles.css';
import './style.css';
import './stylesa.css' //adminstyles
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ats-checker" element={<ATSChecker />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/index" element={<Index />} /> {/* Add this line */}
         <Route path="/admin-dashboard" element={<Admindash />} /> 
          <Route path="/AtsScoreControl" element={<AtsScoreControl />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
