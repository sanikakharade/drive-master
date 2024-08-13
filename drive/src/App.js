// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import UserPanel from './components/UserPanel';
import InstructorPanel from './components/InstructorPanel';
import AdminDashboard from './components/AdminDashboard';
import AdManagement from './components/AdManagement';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<><Hero /><About /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<UserPanel />} />
            <Route path="/instructor" element={<InstructorPanel />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;