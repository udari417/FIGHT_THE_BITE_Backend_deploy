import mongoose from "mongoose";

export const CompetitionSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    HouseHoldNo : {
        type : String,
        required : true
    },
    divisionNumber : {
        type : String,
        required : true
    },
    images : [],
    marks : {
        type : Number,
    },
    uploadedAt : {
        type : String,
        required : true
    },
})

export default mongoose.model.competition || mongoose.model("competitions",CompetitionSchema)