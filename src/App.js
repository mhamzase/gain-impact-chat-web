import React from 'react'
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import {Routes, Route } from 'react-router-dom';
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        {/* <Route path="*" element={<Error code="404" />} /> */}
      </Routes>
    </div>
  );
}

export default App;
