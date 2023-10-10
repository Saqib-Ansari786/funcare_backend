import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import bodyParser from "body-parser";

import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/public", express.static("./public"));
app.use("/uploads", express.static("uploads"));
// Products Apis
// app.use("/api", productRouter);

app.use("/api/auth", userRouter, express.static("./public/uploads/"));

//Error handler middleware
// app.use(middleware);

export default app;
