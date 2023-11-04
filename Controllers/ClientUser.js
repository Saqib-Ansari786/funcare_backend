import { createTransport } from "nodemailer";
import AppUser from "../Models/AppUser.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { generateVerificationData } from "../utils/generateVerificationData.js";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "authenticationappp@gmail.com",
    pass: "xfutqblbqpxyucnn",
  },
});

export const ClientUserRegister = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const { verification_code, verification_code_expiry } =
    generateVerificationData();

  try {
    const mailOptions = {
      from: "authenticationappp@gmail.com",
      to: email,
      subject: "Playland App User Verification Code",
      text: `Verification Code ${verification_code}`,
      html: `<h1>Playland App</h1><h2>We Are glad to have you as our Client. Please check below verification code to verify yourself.</h2> <h3>Verification Code: ${verification_code}</h3> <h4>Verification Code Expiry: 4 minutes</h4><p>Thanks</p> <p>Playland App Team</p>`,
    };
    await transporter.sendMail(mailOptions);

    console.log("mail sent");

    const isClientUser = await AppUser.findOneAndUpdate(
      { email },
      {
        verification_code,
        verification_code_expiry,
        isVerified: false,
      },
      { new: true }
    );
    if (!isClientUser) {
      const clientUser = await AppUser.create({
        email,
        verification_code,
        verification_code_expiry,
      });
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        clientUser,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "User already registered",
        isClientUser,
      });
    }
  } catch (error) {
    console.log(error);
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

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await AppUser.findById(req.params.id);
  if (user) {
    res.status(200).json({
      success: true,
      user,
    });
  } else {
    return next(new ErrorHandler("User not found", 404));
  }
});

export const updateClientUser = catchAsyncErrors(async (req, res, next) => {
  const clientUser = await AppUser.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (clientUser) {
    res.status(200).json({
      success: true,
      clientUser,
    });
  } else {
    return next(new ErrorHandler("User not found", 404));
  }
});
