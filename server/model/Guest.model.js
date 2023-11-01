import mongoose from "mongoose";

export const GuestSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "Field Required!"],
  },

  houseHoldNo: {
    type: String,
    required: [true, "Field Required!"],
  },
  members: [
    {
      name: {
        type: String,
        required: [true, "Field Required!"],
      },
      age: {
        type: String,
        required: [true, "Field Required!"],
      },
      gender: {
        type: String,
        // required: [true, "Field Required!"],
      },
      nic: {
        type: String,
        unique: [true, "Feild Exist"],
      },
      contact: {
        type: String,
        unique: [true, "Feild Exist"],
      },
    },
  ],

  email: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // contact: {
  //   type: String,
  //   required: true,
  // },
  oldgsDivision: {
    type: String,
    required: true,
  },
  newgsDivision: {
    type: String,
    required: true,
  },
  newdivisionnumber: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("guestvillagers",GuestSchema)