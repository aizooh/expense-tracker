const express = require('express');

const { 
    registerUser,
     loginUser, 
     getUserProfile 
    } = require('../controllers/authController');
    
 const router = express.Router();
// Route for user registration
router.post('/register', registerUser);   
router.post('/login', loginUser);
// router.get('/getUser' protect, getUserInfo);
module.exports = router;