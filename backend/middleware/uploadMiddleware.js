const multer = require('multer');

//configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
 cb(null, `${Date.now()}-${file.originalname}`); // append timestamp to the original file name
  },
});
//file filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    // check if the file type is allowed
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // accept the file
    }
    else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'), false); // reject the file
    }
};
//initialize multer with storage and file filter
const upload =multer({
  storage, fileFilter });
  module.exports= upload;