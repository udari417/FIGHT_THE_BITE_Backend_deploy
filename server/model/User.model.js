import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Field Required!"],
  },
  address: {
    type: String,
  },
  nic: {
    type: String,
    required: [true, "Field Required!"],
    unique: [true, "Feild Exist"],
  },
  contact: {
    type: String,
    required: [true, "Field Required!"],
    unique: [true, "Feild Exist"],
  },
  email: {
    type: String,
    required: [true, "Field Required!"],
    unique: [true, "Feild Exist"],
  },
  role: {
    type: String,
    required: [true, "Field Required!"],
  },
  gsDivision: {
    type: String,
  },
  gsDivisions: [],
  divisionNumber: {
    type: String,
  },
  boardName: {
    type: String,
  },
  boardAddress: {
    type: String,
  },
  boardPhone: {
    type: String,
  },
  boardEmail: {
    type: String,
    unique: [true, "Feild Exist"],
  },
  password: {
    type: String,
  },
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);