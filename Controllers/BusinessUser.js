import { createTransport } from "nodemailer";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { generateVerificationData } from "../utils/generateVerificationData.js";
import BusinessUser from "../Models/BusinessUser.js";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "authenticationappp@gmail.com",
    pass: "xfutqblbqpxyucnn",
  },
});

export const BusinessUserRegister = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const { verification_code, verification_code_expiry } =
    generateVerificationData();

  try {
    const mailOptions = {
      from: "authenticationappp@gmail.com",
      to: email,
      subject: "Playland Business App User Verification Code",
      text: `Verification Code ${verification_code}`,
      html: `<h1>Playland App</h1><h2>We Are glad to have you as our Business. Please check below verification code to verify yourself.</h2> <h3>Verification Code: ${verification_code}</h3> <h4>Verification Code Expiry: 4 minutes</h4><p>Thanks</p> <p>Playland App Team</p>`,
    };
    await transporter.sendMail(mailOptions);

    console.log("mail sent");

    const isBusinessUser = await BusinessUser.findOneAndUpdate(
      { email },
      {
        verification_code,
        verification_code_expiry,
        isVerified: false,
      },
      { new: true }
    );
    if (!isBusinessUser) {
      const businessUser = await BusinessUser.create({
        email,
        verification_code,
        verification_code_expiry,
      });
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        businessUser,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "User already registered",
        isBusinessUser,
      });
    }
  } catch (error) {
    console.log(error);
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

export const deleteAllBusinessUser = catchAsyncErrors(
  async (req, res, next) => {
    await BusinessUser.deleteMany();
    res.status(200).json({
      success: true,
      message: "All business users deleted successfully",
    });
  }
);

export const getBusinessUser = catchAsyncErrors(async (req, res, next) => {
  const user = await BusinessUser.findById(req.params.id);
  if (user) {
    res.status(200).json({
      success: true,
      user,
    });
  } else {
    return next(new ErrorHandler("User not found", 404));
  }
});

export const updateBusinessUser = catchAsyncErrors(async (req, res, next) => {
  const businessUser = await BusinessUser.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  if (businessUser) {
    res.status(200).json({
      success: true,
      businessUser,
    });
  } else {
    return next(new ErrorHandler("User not found", 404));
  }
});
