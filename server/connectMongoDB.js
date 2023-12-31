import mongoose from "mongoose";
let dbUrl = "mongodb://0.0.0.0:27017/Vidhyojana";
//connect mongodb
let connectToMongoDb = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log(
      `application is connected to mongodb at port ${dbUrl} successfully.`
    );
  } catch (error) {
    console.log(error.message);
  }
};
export default connectToMongoDb;
