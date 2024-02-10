import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
    },
    profilepic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true } // Corrected option name
);

const User = mongoose.model('User', schema);
export default User;
