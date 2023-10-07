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
    otp: Number,
    otp_expiry: Date,
  },
  { timestamps: true }
);

userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 300 });

const AppUser = mongoose.model("appuser", userSchema);
export default AppUser;
