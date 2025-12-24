import React from "react";
import{BrowserRouter as Router,Routes,Route}from"react-router-dom";
import CarList from "./components/CarList";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <Router>
    
      <Navbar />{/* Navbar displayed on all pages but is out of scope */}
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
       
        
      </Routes>
      
    </Router>
  );
}

export default App;
