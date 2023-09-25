import mongoose from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema({
  firebase_id: {
    type: String,
    // required: [true, "please enter firebase id"],
    
  },
  name: {
    type: String,
    maxlength: [30, "Name connot exceed 30 character"],
    minlength: [3, "Name should have more than 3 character"],
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
    // required: [true, "Please enter Your Phone No"],
    // minlength: [11, "Phone no must be 11 digit"],
    // select: false,
  },
  latitude: {
    type: Number,
    // minlength: [11, "Phone no must be 11 digit"],
    // select: false,
  },
  longitude: {
    type: Number,
    // minlength: [11, "Phone no must be 11 digit"],
    // select: false,
  },
  location: {
    type: String,
    // minlength: [11, "Phone no must be 11 digit"],
    // select: false,
  },
  image: {
    type: String,
  },

  
});


const AppUser = mongoose.model("appuser", userSchema);
export default AppUser;
