import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

// userSchema.statics.printSome = function () {
//   console.log({ printSome: this });
// };

// userSchema.methods.instanceOf = function () {
//   console.log({ instanceOf: this });
// };

const User = mongoose.model("users", userSchema);

export { User };
