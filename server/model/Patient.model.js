import mongoose from "mongoose";

export const PatientSchema = new mongoose.Schema({
    name : {
        type : String,
        requied : true,
    },
    address : {
        type : String,
    },
    wardId : {
        type : String,
    },
    phase : {
        type : Number,
    },
    userId : {
        type : String,
    },
    affectedStatus : {
        type : Number,
        required : true,
        default : 0
    },
    confirmDoctor : {
        type : String,
    },
    affectivityConfirmDate : {
        type : String,
    },
    createdAt : {
        type : String,
        required : true
    },
    updatedAt : {
        type : String,
        required : true
    },
    houseHoldNo : {
        type : String,
        requied : true
    },
    divisionNumber : {
        type : String,
        required : true
    },
    phicomment : {
        type : String
    },
    nic : {
        type : String
    },
    symptoms : []
});

export default mongoose.model.patients || mongoose.model("patients",PatientSchema);