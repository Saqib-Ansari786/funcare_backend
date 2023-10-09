import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import PlaylandUser from "../Models/PlaylandUser.js";

// export const BusinessPlaylandUserCreate = catchAsyncErrors(async (req, res, next) => {

//   try {

//     const record = new BusinessPlaylandUser({

//       path: `http://localhost:9000/${req.file.path.replace(/\\/g, "/")}`,
//       image: req.file.filename,
//       playland_name: req.body.playland_name,
//       discription: req.body.discription,
//       latitude: req.body.latitude,
//       longitude: req.body.longitude,
//       time_open: req.body.time_open,
//       time_close: req.body.time_close,
//       price: req.body.price,
//       discount: req.body.discount,

//     });
//     await record.save();
//     // res.send('Record saved successfully.');
//     res.status(201).json({
//       message: "success",
//       record
//     });

//   } catch (err) {
//     console.error(err);
//   }

// });

////////////////////////////  get All user playland record ////////////////////////
export const BusinessPlaylandData = catchAsyncErrors(async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const userPlayland = await PlaylandUser.find({ user_firebase_id: id });

    if (!userPlayland) {
      return next(new ErrorHandler("Playland not found", 404));
    }

    res.status(201).json({ message: "success", userPlayland });
  } catch (err) {
    console.error(err);
  }
});
