import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import BookingUser from "../Models/BookingUser.js";

export const AppBooking = catchAsyncErrors(async (req, res, next) => {

  const {appuser_id,appplayland_id,starttime,endtime,bookingstatus,amount,method,paymentstatus} = req.body;

  try {

      const bookinguser = await BookingUser.create({
        appuser_id,
        appplayland_id,
        starttime,
        endtime,
        bookingstatus,
        amount,
        method,
        paymentstatus,
      });

      res.status(201).json({
        success: true,
        bookinguser,
      });

  } catch (error) {
    res.status(500).json({
      message: "error" + error
    });
  }


});




//////////////////////////// get user booking Record ////////////////////////
export const AppBookingData = catchAsyncErrors(async (req, res, next) => {

  try {

    const id = req.params.id;

    const userBooking = await BookingUser.find({appuser_id: id});

    if (!userBooking) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    res.status(201).json({ message: "success", userBooking });
    
  } catch (err) {
    console.error(err);
  }


});