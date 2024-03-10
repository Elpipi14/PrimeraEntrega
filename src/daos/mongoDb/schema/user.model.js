import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: { type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    }
  });

  export const UserModel = mongoose.model("customers", userSchema);