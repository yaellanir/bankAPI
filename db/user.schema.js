import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  cash: { type: Number, required: true },
  credit: { type: Number, required: true },
  passport: { type: Number, required: true },
});

export { userSchema };
