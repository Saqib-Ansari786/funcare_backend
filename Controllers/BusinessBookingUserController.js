import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import BusinessBookingUser from "../Models/BusinessBookingUser.js";
import dotenv from "dotenv";
dotenv.config();
import stripePackage from "stripe";
import stripe from "stripe";
const secretKey =
  "sk_test_51NEDnZD7q9cT09mVx6pZKtUePb04E0SpzlLSCNpD7qyTBW7wfH3uP1hbFsNIAFuyePxzPfhkbWQi6hyVazcFXUi40024laLDyQ";
const stripeClient = stripe(secretKey);

export const BusinessBookingUserCreate = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const businessbookinguserrecord = await BusinessBookingUser.create(
        req.body
      );

      res.status(201).json({
        success: true,
        businessbookinguserrecord,
      });
    } catch (error) {
      res.status(500).json({
        message: "error" + error,
      });
    }
  }
);

//////////////////////////// get business user booking  ////////////////////////
export const BookingUserData = catchAsyncErrors(async (req, res, next) => {
  try {
    const id = req.params.id;
    const userbooking = await BusinessBookingUser.find({ appuser_id: id });

    if (!userbooking) {
      return next(new ErrorHandler("Booking not found", 404));
    }

    res.status(201).json({ message: "success", userbooking });
  } catch (err) {
    console.error(err);
  }
});

///////////// update playland user data ////////////////////

export const BusinessPlaylandUpdate = async (req, res, next) => {
  const bookingUser = await BusinessBookingUser.findById(req.params.id);

  if (!bookingUser) {
    return next(new ErrorHandler("playland not found", 404));
  }

  const UpdateBookingUser = await BusinessBookingUser.findOneAndUpdate(
    { _id: req.params.id }, // Filter to find the document to update
    {
      paymentstatus: "confirmed",
      bookingstatus: "confirmed",
    }, // Object containing the update properties and values
    { new: true } // To return the updated document
  );

  res.status(201).json({ message: "success", UpdateBookingUser });
};

export const UpdateBookingSeats = async (req, res, next) => {
  const bookingUser = await BusinessBookingUser.findById(req.params.id);

  if (!bookingUser) {
    return next(new ErrorHandler("playland not found", 404));
  }

  const UpdateBookingUser = await BusinessBookingUser.findOneAndUpdate(
    { _id: req.params.id }, // Filter to find the document to update
    {
      seats: req.body.seats,
    }, // Object containing the update properties and values
    { new: true } // To return the updated document
  );

  res.status(201).json({ message: "success", UpdateBookingUser });
};

////////////////////////////  Booked playland record ////////////////////////
export const BusinessPlaylandBooked = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const bookedplayland = await BusinessBookingUser.find({
        appplayland_id: id,
      });

      if (!bookedplayland) {
        return next(new ErrorHandler("Product not found", 404));
      }

      res.status(201).json({ message: "success", bookedplayland });
    } catch (err) {
      console.error(err);
    }
  }
);

export const PaymentCreate = catchAsyncErrors(async (req, res, next) => {
  // const stripeSecretKey = process.env.SECRET_KEY;
  // const stripe = stripePackage(stripeSecretKey);

  try {
    const charge = await stripeClient.charges.create({
      amount: req.body.amount,
      currency: "usd",
      source: req.body.stripeToken.token.id,
      description: "Payment for fun care booking",
    });

    //  console.log(charge);
    res.status(201).json({ message: "success", charge });
  } catch (err) {
    res.status(400).json({ message: "Error", err });
  }
});

export const GetAllConfirmedBooking = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const booking = await BusinessBookingUser.find({
        paymentstatus: "confirmed",
        timing_selected: req.params.timing_selected,
      });

      if (!booking) {
        return next(new ErrorHandler("Booking not found", 404));
      }

      res.status(201).json({ message: "success", booking });
    } catch (err) {
      console.error(err);
    }
  }
);
