import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, "Field Required!"],
    },
    gsDivision: {
        type: String,
        required: [true, "Field Required!"],
    },
    divisionNumber: {
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
});

export default mongoose.model.Villages || mongoose.model("Villager", UserSchema);
