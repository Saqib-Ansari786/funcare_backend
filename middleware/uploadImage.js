import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

export default upload;
