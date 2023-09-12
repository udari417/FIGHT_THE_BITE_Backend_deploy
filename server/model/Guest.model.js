import mongoose from "mongoose";

export const GuestSchema = new mongoose.Schema({

  email: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  password : {
    type : String,
    required : true,
  },
  contact : {
    type : String,
    required : true,
  },
  GuestVillager: [
    {
      name: {
        type: String,
        required: true,
      },
      nic: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      age: {
        type: String,
        required: true,
      },
    },
  ],
  members: [
    {
      name: {
        type: String,
        required: true,
      },
      nic: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      age: {
        type: String,
        required: true,
      },
    },
  ],
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