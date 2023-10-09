import mongoose from "mongoose";
// import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    playland_name: {
      type: String,
    },
    discription: {
      type: String,
    },
    time_open: {
      type: String,
    },
    time_close: {
      type: String,
    },
    image: {
      filename: {
        type: String,
      },
      path: {
        type: String,
      },
    },
    location: {
      type: String,
    },
    packages: [
      {
        package_name: {
          type: String,
        },
        price: {
          type: String,
        },
        discount: {
          type: String,
        },
        discription: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PlaylandUser = mongoose.model("playlanduser", userSchema);
export default PlaylandUser;
