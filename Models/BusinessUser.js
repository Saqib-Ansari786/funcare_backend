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
      filename: {
        type: String,
      },
      path: {
        type: String,
      },
    },
    otp: Number,
    otp_expiry: Date,
  },
  { timestamps: true }
);
userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 300 });

const BusinessUser = mongoose.model("businessuser", userSchema);
export default BusinessUser;
