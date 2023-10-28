import mongoose from "mongoose";

export const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  organizationid: {
    type: String,
    required: true,
  },
  divisionNumber: {
    type : String,
    required : true,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  status : {
    type : Number,
    required : true,
    default : 0,
  }
});

export default mongoose.model.campaigns || mongoose.model("campaigns",CampaignSchema)