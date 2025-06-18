const express = require('express');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const { 
    registerUser,
     loginUser, 
     getUserInfo 
    } = require('../controllers/authController');
    
 const router = express.Router();
// Route for user registration
router.post('/register', registerUser);   
router.post('/login', loginUser);
 router.get('/getUser', protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file){
        return res.status(400).json({ message: "No file uploaded" });
    }
    const profileImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ profileImageUrl });  
    res.status(200).json({ profileImageUrl });
});



module.exports = router;