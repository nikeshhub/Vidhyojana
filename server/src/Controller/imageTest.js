import { Test } from "../Model/model.js";

export const postImage = async (req, res) => {
  try {
    const image = `localhost:8000/${req.file.filename}`;
    console.log(image);
    const result = await Test.create({ image });
    res.json({
      success: true,
      message: "Image added",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};
