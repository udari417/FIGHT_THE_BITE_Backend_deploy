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
    houseHolder: [
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
                required: [true, "Field Required!"],
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
    member1: [
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
                required: [true, "Field Required!"],
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
    member2: [
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
                required: [true, "Field Required!"],
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
    member3: [
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
                required: [true, "Field Required!"],
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
    member4: [
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
                required: [true, "Field Required!"],
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
    member5: [
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
                required: [true, "Field Required!"],
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
    member6: [
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
                required: [true, "Field Required!"],
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
    member7: [
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
                required: [true, "Field Required!"],
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
    member8: [
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
                required: [true, "Field Required!"],
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
    member9: [
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
                required: [true, "Field Required!"],
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
    member10: [
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
                required: [true, "Field Required!"],
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
    member11: [
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
                required: [true, "Field Required!"],
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
