import React from 'react'

import {
  BrowserRouter as Router ,
  Routes,
  Route,
  Navigate,
}from "react-router-dom";
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/Expense';
import Income from './pages/Dashboard/Income';





const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signUp" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/expense" exact element={<Expense />} />
          <Route path="/income" exact element={<Income />} />
         
        </Routes>
      </Router>
    </div>
  )
}

export default App;

const Root = () => {

  //check if taken is present in local storage
  const isAuthenticated = !!localStorage.getItem("taken");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};