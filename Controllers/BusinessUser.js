import BusinessUser from "../Models/BusinessUser.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { generateVerificationData } from "../utils/generateVerificationData.js";
import { sendMail } from "../utils/sendMail.js";

export const BusinessUserRegister = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;
  const { verification_code, verification_code_expiry } =
    generateVerificationData();
  const result = await sendMail(email, verification_code);
  if (result) {
    const businessUser = await BusinessUser.create({
      name,
      email,
      verification_code,
      verification_code_expiry,
    });
    res.status(201).json({
      success: true,
      userId: businessUser._id,
      message: "Verification code sent to your email",
    });
  } else {
    return next(new ErrorHandler("Something went wrong", 500));
  }
});

export const BusinessUserVerify = catchAsyncErrors(async (req, res, next) => {
  const { userId, verification_code } = req.body;
  const businessUser = await BusinessUser.findById(userId);
  if (businessUser) {
    if (businessUser.verification_code_expiry > new Date()) {
      if (businessUser.verification_code === verification_code) {
        businessUser.isVerified = true;
        await businessUser.save();
        res.status(200).json({
          success: true,
          message: "User verified successfully",
          businessUser,
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
