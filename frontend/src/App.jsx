import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/Expense';
import Income from './pages/Dashboard/Income';
import UserProvider from './context/userContext';
import { Toaster } from 'react-hot-toast';
import AnalyticsTracker from './AnalyticsTracker';

const App = () => {
  return (
    <UserProvider>
      <div>
      <Router basename="/expense-tracker/">
      <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
        </Routes>
      </Router>
</div>
<Toaster 
toastOptions={{
  className:"",
  style:{
    fontsize:"13px"
  },
}}/>

    </UserProvider>
  );
};

export default App;

const Root = () => {
  // Check if token is present in local storage
  const isAuthenticated = !!localStorage.getItem("taken"); // Change "taken" to "token" if that's what you use
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
