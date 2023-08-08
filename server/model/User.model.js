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
    divisionNumber: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Field Required!"],
    },
    
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);