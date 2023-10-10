import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
  },
  path: {
    type: String,
  },
});

const ImageUpload = mongoose.model("Image", imageSchema);

export default ImageUpload;
