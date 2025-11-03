import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connected successfully ---- host: ${conn.connection.host}`);
  } catch (error) {
    console.log("Failed to connect Mongodb");
    process.exit(1)
  }
};

export default connectdb;
