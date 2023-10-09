import express from "express";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});
const upload = multer({ storage: storage });
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
} from "../Controllers/PlaylandUserController.js";
import {
  BusinessUserSet,
  BusinessUserGet,
} from "../Controllers/BusinessUserController.js";
import { BusinessPlaylandData } from "../Controllers/BusinessPlaylandUserController.js";
import {
  BusinessBookingUserCreate,
  BookingUserData,
  BusinessPlaylandBooked,
  PaymentCreate,
  BusinessPlaylandUpdate,
  UpdateBookingSeats,
} from "../Controllers/BusinessBookingUserController.js";

const userRouter = express.Router();

userRouter.route("/appuser").post(AppUserSet);

userRouter.route("/user/record/:id").get(AppUserData);

userRouter.route("/user/update/:id").post(AppUserUpdate);

// userRouter.route("/playlanduser").post(upload.single("image"),PlaylandUserCreate);

userRouter.route("/create/playlanduser").post(CreatePlaylandUser);

userRouter.route("/playlandrecord").get(PlaylandAllData);

userRouter.route("/playlanduser/update/:id").post(PlaylandUserUpdate);

userRouter.route("/playlanduser/delete/:id").post(PlaylandUserDelete);

// business user end point

userRouter.route("/businessuser").post(BusinessUserSet);

userRouter.route("/businessuser/record/:id").get(BusinessUserGet);

// userRouter.route("/businessplaylanduser").post(upload.single("image"),BusinessPlaylandUserCreate);

userRouter.route("/user/playland/:id").get(BusinessPlaylandData);

userRouter.route("/playland/update/:id").post(BusinessPlaylandUpdate);

userRouter.route("/booked/playland/:id").get(BusinessPlaylandBooked);

userRouter.route("/businessbookinguser").post(BusinessBookingUserCreate);

userRouter.route("/payment").post(PaymentCreate);

userRouter.route("/userbooking/:id").get(BookingUserData);
userRouter.route("/update/seats/:id").post(UpdateBookingSeats);

// userRouter.route("/client/sendOTP").post(CleintsendOTP);
// userRouter.route("/client/verifyOTP").post(CleintverifyOTP);

// userRouter.route("/business/sendOTP").post(BusinesssendOTP);
// userRouter.route("/business/verifyOTP").post(BusinessverifyOTP);

export default userRouter;
