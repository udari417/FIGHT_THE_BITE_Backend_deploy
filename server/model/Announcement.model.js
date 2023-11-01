import mongoose from "mongoose";

export const AnnouncementSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: [true, "Field Required!"],
    },
    title: {
        type: String,
        required: [true, "Field Required!"],
    },
    massage: {
        type: String,
        required: [true, "Field Required!"],
    },
    date: {
        type: String,
        required: [true, "Field Required!"],
    },
    receivers: []
    
});

export default mongoose.model.Announcement ||
    mongoose.model("Announcement", AnnouncementSchema);
