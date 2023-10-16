import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import PlaylandUser from "../Models/PlaylandUser.js";

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
