import mongoose from "mongoose";
// import validator from "validator";


const userSchema = new mongoose.Schema({
  appuser_id: {
    // type: String,
    // required: [true, "please enter firebase id"],
    
  },
  appplayland_id: {
    // type: String,
    // required: [true, "please enter firebase id"],
    
  },
  starttime: {
    type: String,
    // maxlength: [30, "Name connot exceed 30 character"],
    // minlength: [3, "Name should have more than 3 character"],
  },
  endtime: {
    type: String,
    // maxlength: [30, "Name connot exceed 30 character"],
    // minlength: [3, "Name should have more than 3 character"],
  },
  bookingstatus: {
    type: String,
    
  },
  amount: {
    type: Number,
    // required: [true, "Please enter Your Phone No"],
    // minlength: [11, "Phone no must be 11 digit"],
    // select: false,
  },
  method: {
    type: String,
    // required: [true, "Please enter Your Phone No"],
    // minlength: [11, "Phone no must be 11 digit"],
    // select: false,
  },
  paymentstatus: {
    type: String,
    // required: [true, "Please enter Your Phone No"],
    // minlength: [11, "Phone no must be 11 digit"],
    // select: false,
  },

  
});


const BusinessBookingUser = mongoose.model("businessbookinguser", userSchema);
export default BusinessBookingUser;
