import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, (error, client) => {
  if (error) {
    console.log(error);
  }
  if (!process.env.NODE_ENV) {
    console.log(!process.env.NODE_ENV);
    const { host, port, name } = client;
    console.log({ host, port, name });
  }
});
