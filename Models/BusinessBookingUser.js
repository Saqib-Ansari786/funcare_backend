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
  },
  endtime: {
    type: String,
  },
  bookingstatus: {
    type: String,
  },
  amount: {
    type: Number,
  },
  method: {
    type: String,
  },
  paymentstatus: {
    type: String,
  },
  seats: {
    type: Number,
  },
  packages_selected: [
    {
      package_id: {
        type: String,
      },
    },
  ],
});

const BusinessBookingUser = mongoose.model("businessbookinguser", userSchema);
export default BusinessBookingUser;
