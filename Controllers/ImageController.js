import ImageUpload from "../Models/ImageUpload.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const imageUpload = catchAsyncErrors(async (req, res, next) => {
  try {
    const { originalname, path } = req.file;

    const image = await ImageUpload.create({
      filename: originalname,
      path: path,
    });
    res.status(201).json({
      message: "success",
      image,
    });
  } catch (err) {
    console.error(err);
  }
});
