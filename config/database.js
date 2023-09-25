import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect("mongodb+srv://suleman2795:UvecXRbYcd4ZjUe0@cluster0.jjn78vd.mongodb.net/test")
    // .connect("mongodb://localhost:27017/ecommercedb")
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log("errer while connecting DB" + err);
    });
};

export default connectDb;
