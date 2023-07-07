import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Field Required!"],
    },
    email: {
        type: String,
        required: [true, "Field Required!"],
        unique: [true, "Feild Exist"],
    },
    password: {
        type: String,
        required: [true, "Field Required!"],
    },
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);