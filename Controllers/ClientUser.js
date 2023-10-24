import { createTransport } from "nodemailer";
import AppUser from "../Models/AppUser.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { generateVerificationData } from "../utils/generateVerificationData.js";
import { sendMail } from "../utils/sendMail.js";

export const ClientUserRegister = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;
  const { verification_code, verification_code_expiry } =
    generateVerificationData();

  const result = await sendMail(email, verification_code);

  if (result) {
    const clientUser = await AppUser.create({
      name,
      email,
      verification_code,
      verification_code_expiry,
    });
    res.status(201).json({
      success: true,
      userId: clientUser._id,
      message: "Verification code sent to your email",
    });
  } else {
    return next(new ErrorHandler("Something went wrong", 500));
  }
});

export const ClientUserVerify = catchAsyncErrors(async (req, res, next) => {
  const { userId, verification_code } = req.body;
  const clientUser = await AppUser.findById(userId);
  if (clientUser) {
    if (clientUser.verification_code_expiry > new Date()) {
      if (clientUser.verification_code === verification_code) {
        clientUser.isVerified = true;
        await clientUser.save();
        res.status(200).json({
          success: true,
          message: "User verified successfully",
          clientUser,
        });
      } else {
        return next(new ErrorHandler("Invalid verification code", 400));
      }
    } else {
      return next(new ErrorHandler("Verification code expired", 400));
    }
  } else {
    return next(new ErrorHandler("User not found", 404));
  }
});

export const deleteAllClientUser = catchAsyncErrors(async (req, res, next) => {
  await AppUser.deleteMany();
  res.status(200).json({
    success: true,
    message: "All client users deleted successfully",
  });
});
