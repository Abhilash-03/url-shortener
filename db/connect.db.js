import mongoose from "mongoose";

const connectDB = async (url) => {
    await mongoose.connect(url);
    console.log("Mongodb is connected!!");
}

export { connectDB }