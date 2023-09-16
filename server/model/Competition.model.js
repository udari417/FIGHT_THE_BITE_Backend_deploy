import mongoose, { mongo } from "mongoose";

export const CompetitionSchema = new mongoose.Schema({
    villagerId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : villagers,
    },
    divisionNumber : {
        type : String,
        required : true
    },
    images : [],
    uploadedAt : {
        type : String,
        required : true
    },
    updatedAt : {
        type : String,
        required : true
    },
})

export default mongoose.model.competition || mongoose.model("competitions",CompetitionSchema)