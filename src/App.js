import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Example } from './components/Example';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route path="/about" element={<About />} />
          <Route path="/crud" element={<Example />} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
