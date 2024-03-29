import mongoose from "mongoose";
// import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    playland_name: {
      type: String,
    },
    discription: {
      type: String,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    timing1: {
      timing: {
        type: String,
      },
      total_seats: {
        type: Number,
      },
    },
    timing2: {
      timing: {
        type: String,
      },
      total_seats: {
        type: Number,
      },
    },
    timing3: {
      timing: {
        type: String,
      },
      total_seats: {
        type: Number,
      },
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
