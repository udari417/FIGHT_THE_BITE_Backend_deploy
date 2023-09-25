import mongoose from "mongoose";

export const OTP = new mongoose.Schema(
  {
    nic : {
      type: String,
    },
    email: {
      type: String,
      // required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    token : {
      type: String,
      required : true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    createdAt: {
      type : Date,
      default : Date.now(),
    },
    type : {
      type : String,
      required : true,
    },
    // createdAt: { type: Date, default: Date.now(), index: { expires: 1800 } },
  },
  // { timestamps: true }
);


// const otp = mongoose.model('otp',OTP)
// module.exports = otp\

export default mongoose.model("otp",OTP)