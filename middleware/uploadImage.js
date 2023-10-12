import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Define the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, "image-" + Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({ storage });

export default upload;
