import mongoose from "mongoose";
// import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    appuser_id: {
      // type: String,
      // required: [true, "please enter firebase id"],
    },
    appplayland_id: {
      // type: String,
      // required: [true, "please enter firebase id"],
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
    timing_selected: {
      type: String,
    },
    packages_selected: {
      type: String,
    },
    date_selected: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const BusinessBookingUser = mongoose.model("businessbookinguser", userSchema);
export default BusinessBookingUser;
