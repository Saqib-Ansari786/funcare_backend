import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [30, "Name connot exceed 30 character"],
      minlength: [3, "Name should have more than 3 character"],
    },
    email: {
      type: String,
      unique: true,
    },

    image: {
      type: String,
    },
    verification_code: {
      type: String,
    },
    verification_code_expiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BusinessUser = mongoose.model("businessuser", userSchema);
export default BusinessUser;
