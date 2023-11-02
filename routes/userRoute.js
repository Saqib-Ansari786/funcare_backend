import express from "express";

import {
  AppUserSet,
  AppUserData,
  AppUserUpdate,
} from "../Controllers/AppUSerController.js";
import {
  CreatePlaylandUser,
  PlaylandAllData,
  PlaylandUserUpdate,
  PlaylandUserDelete,
  DeleteAllPlayland,
} from "../Controllers/PlaylandUserController.js";
import {
  BusinessUserSet,
  BusinessUserGet,
} from "../Controllers/BusinessUserController.js";
import {
  BusinessBookingUserCreate,
  BookingUserData,
  BusinessPlaylandBooked,
  PaymentCreate,
  BusinessPlaylandUpdate,
  UpdateBookingSeats,
  GetAllConfirmedBooking,
  deleteAllBooking,
} from "../Controllers/BusinessBookingUserController.js";
import upload from "../middleware/uploadImage.js";
import { imageUpload } from "../Controllers/ImageController.js";
import {
  ClientUserRegister,
  ClientUserVerify,
  deleteAllClientUser,
  getUser,
} from "../Controllers/ClientUser.js";

const userRouter = express.Router();

userRouter.route("/appuser").post(AppUserSet);

userRouter.route("/user/record/:id").get(AppUserData);

userRouter.route("/user/update/:id").post(AppUserUpdate);

//Client User end point

userRouter.route("/clientuser/sendEmail").post(ClientUserRegister);
userRouter.route("/clientuser/verifyEmail").post(ClientUserVerify);
userRouter.route("/clientuser/deleteAll").delete(deleteAllClientUser);
userRouter.route("/clientuser/:id").get(getUser);

// userRouter.route("/playlanduser").post(upload.single("image"),PlaylandUserCreate);

userRouter.route("/upload/image").post(upload.single("image"), imageUpload);

userRouter.route("/create/playlanduser").post(CreatePlaylandUser);

userRouter.route("/playlandrecord").get(PlaylandAllData);

userRouter.route("/playlanduser/update/:id").post(PlaylandUserUpdate);

userRouter.route("/playlanduser/delete/:id").post(PlaylandUserDelete);
userRouter.route("/delete/allplaylands").delete(DeleteAllPlayland);

// business user end point

userRouter.route("/businessuser").post(BusinessUserSet);

userRouter.route("/businessuser/record/:id").get(BusinessUserGet);

// userRouter.route("/businessplaylanduser").post(upload.single("image"),BusinessPlaylandUserCreate);

userRouter.route("/playland/update/:id").post(BusinessPlaylandUpdate);

userRouter.route("/booked/playland/:id").get(BusinessPlaylandBooked);

userRouter.route("/businessbookinguser").post(BusinessBookingUserCreate);

userRouter.route("/payment").post(PaymentCreate);

userRouter.route("/userbooking/:id").get(BookingUserData);
userRouter.route("/update/seats/:id").post(UpdateBookingSeats);
userRouter.route("get/booking/:timing_selected").get(GetAllConfirmedBooking);
userRouter.route("/delete/allbooking").delete(deleteAllBooking);

// userRouter.route("/client/sendOTP").post(CleintsendOTP);
// userRouter.route("/client/verifyOTP").post(CleintverifyOTP);

// userRouter.route("/business/sendOTP").post(BusinesssendOTP);
// userRouter.route("/business/verifyOTP").post(BusinessverifyOTP);

export default userRouter;
