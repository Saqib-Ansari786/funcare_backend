import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import PlaylandUser from "../Models/PlaylandUser.js";

// export const PlaylandUserCreate = catchAsyncErrors(async (req, res, next) => {

//   try {
//     const record = new PlaylandUser({

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

export const CreatePlaylandUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const record = new PlaylandUser(req.body);
    await record.save();
    // res.send('Record saved successfully.');
    res.status(201).json({
      message: "success",
      record,
    });
  } catch (err) {
    console.error(err);
  }
});

////////////////////////////  get All playland Record ////////////////////////
export const PlaylandAllData = catchAsyncErrors(async (req, res, next) => {
  try {
    PlaylandUser.find({}, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

///////////// update playland user data ////////////////////

export const PlaylandUserUpdate = async (req, res, next) => {
  const playlandUser = await PlaylandUser.findById(req.params.id);
  // console.log(playlandUser);
  if (!playlandUser) {
    return next(new ErrorHandler("playland not found", 404));
  }
  const UpdateplaylandUser = await PlaylandUser.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  res.status(201).json({ message: "success", UpdateplaylandUser });
};

///////////// delete playland user ////////////////////

export const PlaylandUserDelete = async (req, res, next) => {
  const playlandrecord = await PlaylandUser.findById(req.params.id);
  if (!playlandrecord) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await playlandrecord.remove();
  res.status(201).json({ message: "success", playlandrecord });
};
