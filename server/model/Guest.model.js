import mongoose from "mongoose";

export const GuestSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,

    },
    oldaddress : {
        type : String,
        required : true
    },
    newaddress : {
        type : String,
        required : true
    },

    nic : {
        type : String,
        required : true
    },
    members : [
        {
            name : {
                type : String,
                required : true,
            },
            nic : {
                type  : String,
                required : true,
            },
            mobile : {
                type : String,
                required : true,
            },
            gender : {
                type : String,
                required : true,
            },
            age : {
                type : String,
                required : true,
            }

        }
    ],
    oldgsDivision : {
        type : String,
        required : true,
    },
    olddivisionnumber : {
        type : String,
        required : true,
    },
    newgsDivision : {
        type : String,
        required : true,
    },  
    newdivisionnumber : {
        type : String,
        required : true,
    },
    status : {
        type : Number,
        required : true,
        default : 0,
    }

})