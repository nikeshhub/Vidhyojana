import { Schema } from "mongoose";

const testSchema = Schema({
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

export default testSchema;
